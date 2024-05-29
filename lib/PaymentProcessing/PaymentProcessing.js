import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppContext, ordersAPI } from "../../App";
import { colorPalete, paymentMethod } from "../constants";
import makeApiRequest from "../api";
import {
  currency,
  navItems,
  removeData,
  retrieveData,
  routePrevious,
  routeTo,
} from "../utils";
import { Icon } from "../Shared/Icon";
import LottieView from "lottie-react-native";

export default function PaymentProcessing() {
  const {
    setSnackSeverity,
    setOpenSnackbarContent,
    setOpenSnackbar,
    setSelectedOrder,
    setRouteStack,
    routeStack,
    setPage,
    orders,
    setOrders,
    setProducts
  } = useContext(AppContext);

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [triggeredTimer, setTriggeredTimer] = useState(false);
  const [currentPaymentState, setCurrentPaymentState] =
    useState("Payment Processing");

  useEffect(() => {
    if (!remainingTime) {
      if (amount !== null) {
        setTimeout(checkPayment, 10000);
      }
    }
  }, [remainingTime]);

  const setCurrentOrder = async () => {
    const orderIdCurrent = await retrieveData({ key: "orderId" });
    const amountCurrent = await retrieveData({ key: "amount" });
    const startTimeCurrent = await retrieveData({ key: "startTime" });
    if(startTimeCurrent) {
      setOrderId(orderIdCurrent.orderId);
      setAmount(amountCurrent.amount);
      setStartTime(startTimeCurrent.startTime);
      if (!triggeredTimer) {
        setTriggeredTimer(true);
        triggerTimer(startTimeCurrent.startTime);
      }
    } else {
      checkPayment()
    }
    
  };
  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = ((timeInMilliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const updateTimer = (remainingTimeLocal) => {
    // console.log("Update Timer Ran");
    setTimeout(() => {
      if (remainingTimeLocal > 0) {
        // console.log("setting time");
        // console.log(remainingTimeLocal);
        setRemainingTime(remainingTimeLocal - 1000); // Decrease time by 1 second
        updateTimer(remainingTimeLocal - 1000); // Schedule the next update
      } else {
        removeData({ key: "startTime" });
        checkPayment();
      }
    }, 1000); // Timeout for 1 second
  };

  const redirectPayment = async () => {
    const paymentLink = await retrieveData({ key: "paymentLink" });
    if (paymentLink) {
      if (Platform.OS !== "web") {
        Linking.openURL(paymentLink.paymentLink);
      } else {
        window.open(paymentLink.paymentLink, "_blank");
      }
    }
  };
  const setAndRedirect = ({ order }) => {
    setSelectedOrder({...order, tracking: ""});
    routeTo({
      setRouteStack,
      routeStack,
      setPage,
      newPage: navItems[7],
      stepper: true,
    });
  };
  const setPaymentFailed = async () => {
    const orderIdCurrent = await retrieveData({ key: "orderId" });
    if (orderIdCurrent) {
      try {
        let res = await makeApiRequest(
          "POST",
          { orderId: orderIdCurrent.orderId, paymentStatus: "Failed" },
          "/orders/update",
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          false
        );

        if (res?.status === 200) {
          await removeData({ key: "paymentLink" });
          await removeData({ key: "orderId" });
          await removeData({ key: "amount" });
          await removeData({ key: "startTime" });
          await ordersAPI(
            setSnackSeverity,
            setOpenSnackbar,
            setOpenSnackbarContent,
            setOrders
          );

          setAndRedirect({
            order: {
              ...orders.filter((o) => o.orderId === orderIdCurrent.orderId)[0],
              paymentStatus: "Failed",
            },
          });
          // localStorage.removeItem("orderId");
          // localStorage.removeItem("link");
          // localStorage.removeItem("mode");
          // localStorage.removeItem("amount");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const checkPayment = async () => {
    const isActive = await retrieveData({ key: "startTime" });
    const userDetails = await retrieveData({ key: "user" });
    const orderIdCurrent = await retrieveData({ key: "orderId" });
    const paymentLink = await retrieveData({ key: "paymentLink" });
    if (paymentLink) {
      if (paymentMethod.sabPaise) {
        if (orderIdCurrent) {
          let res = await makeApiRequest(
            "POST",
            { userId: userDetails?.email },
            "/orders/get",
            setSnackSeverity,
            setOpenSnackbar,
            setOpenSnackbarContent,
            false
          );
          console.log(
            res?.orders?.filter((o) => {
              return o.orderId === orderIdCurrent.orderId;
            })[0].paymentStatus
          );
          let paymentStatus = res?.orders?.filter((o) => {
            return o.orderId === orderIdCurrent.orderId;
          })[0].paymentStatus;
          try {
            if (isActive) {
              if (paymentStatus === "Paid" || paymentStatus === "Failed") {
                await removeData({ key: "paymentLink" });
                await removeData({ key: "orderId" });
                await removeData({ key: "amount" });
                await removeData({ key: "startTime" });
                await ordersAPI(
                  setSnackSeverity,
                  setOpenSnackbar,
                  setOpenSnackbarContent,
                  setOrders
                );

                setAndRedirect({
                  order: orders.filter(
                    (o) => o.orderId === orderIdCurrent.orderId
                  )[0],
                });
              } else {
                setTimeout(checkPayment, 10000);
              }
            } else {
              if (paymentStatus === "Payment Processing") {
                console.log("Clearning Payment", paymentStatus);
                await setPaymentFailed();
              }
            }
          } catch (e) {
            setSnackSeverity("danger");
            setOpenSnackbarContent("Something went wrong");
            setOpenSnackbar(true);
            console.log(e);
            //   localStorage.removeItem("remainingTime");
            //   localStorage.removeItem("orderId");
            //   localStorage.removeItem("link");
            //   localStorage.removeItem("mode");
            //   setSidePage("Orders");
            //   setSubPage("orders");
            return;
          }
        } else {
        }
      } else if (paymentMethod.cashfree) {
        let res = await makeApiRequest(
          "POST",
          { order_id: orderIdCurrent.orderId },
          "/orders/status",
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          false
        );
        let paymentStatus = res?.data?.link_status;
        if (isActive) {
          if (paymentStatus === "PAID") {
            await removeData({ key: "paymentLink" });
            await removeData({ key: "orderId" });
            await removeData({ key: "amount" });
            await removeData({ key: "startTime" });

            let resUpdate = await makeApiRequest(
              "POST",
              { orderId: orderIdCurrent.orderId, paymentStatus: "Paid" },
              "/orders/update",
              setSnackSeverity,
              setOpenSnackbar,
              setOpenSnackbarContent,
              false
            );
            if (resUpdate?.status == 200) {
              await ordersAPI(
                setSnackSeverity,
                setOpenSnackbar,
                setOpenSnackbarContent,
                setOrders
              );
              console.log(
                "Setting order - ",
                orders.filter((o) => o.orderId === orderIdCurrent.orderId)[0]
              );
              setAndRedirect({
                order: orders.filter(
                  (o) => o.orderId === orderIdCurrent.orderId
                )[0],
                
              });
              let res = await makeApiRequest(
                "GET",
                {},
                "/products/all",
                setSnackSeverity,
                setOpenSnackbar,
                setOpenSnackbarContent,
                false
              );
              if(res?.products) {
                console.log("Products Updated");
                setProducts(res?.products);
              }
            } else {
              await setPaymentFailed();
              setTimeout(checkPayment, 10000);
            }
          } else if (
            paymentStatus === "EXPIRED" ||
            paymentStatus === "TERMINATED" ||
            paymentStatus === "TERMINATION_REQUESTED"
          ) {
            await setPaymentFailed();
            setTimeout(checkPayment, 10000);
          } else {
            console.log(paymentStatus);
            setTimeout(checkPayment, 10000);
          }
        } else {
          if ( paymentStatus === "EXPIRED" ||
          paymentStatus === "TERMINATED" ||
          paymentStatus === "TERMINATION_REQUESTED" || paymentStatus === "Payment Processing") {
            console.log("Clearning Payment", paymentStatus);
            await setPaymentFailed();
          }
          console.log(res?.data?.link_status);
        }
      } else {
        if (paymentStatus === "Payment Processing") {
          console.log("Clearning Payment", paymentStatus);
          await setPaymentFailed();
        }
        console.log(res?.data?.link_status);
      }
    } else {
      setPaymentFailed();
    }
  };

  const triggerTimer = (startTime) => {
    if (startTime) {
      const now = new Date().getTime();
      const timeElapsed = now - parseInt(startTime, 10);
      const remainingTimeLocal = Math.max(0, 600000 - timeElapsed); // 10 minutes in milliseconds
      // Check if 10 minutes have passed
      
      if (remainingTimeLocal === 0) {
        removeData({ key: "startTime" });
      } else {
        //   console.log("Update Timer Ran", remainingTimeLocal);
        setRemainingTime(remainingTimeLocal);
        updateTimer(remainingTimeLocal); // Start the timer
      }
    }
  };
  useEffect(() => {
    setCurrentOrder();
  }, []);

  return (
    <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
      <View style={styles.parentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{orderId}</Text>
          <Text style={styles.headerText}>
            {currency.INR}
            {amount}
          </Text>
        </View>
        <View style={styles.processingContainer}>
          <View>
            <LottieView
              style={styles.lottieStyle}
              loop={true}
              autoPlay
              source={require("../../assets/loading.json")}
            />
          </View>
          <Text style={styles.processingText}>Payment</Text>
          <Text style={styles.processingText}>Processing</Text>
          <Text style={styles.timerText}>
            Time Elapsed: {formatTime(remainingTime)}
          </Text>
        </View>
        <View style={styles.footerContiner}>
          <Pressable onPress={redirectPayment} style={styles.retryContainer}>
            <Text style={styles.retryButtonText}>Retry payment</Text>
            <Icon
              name={"sync"}
              size={23}
              action={() => {}}
              active={false}
              badge={0}
              color={colorPalete.silver_silk}
            />
          </Pressable>

          <Pressable onPress={setPaymentFailed}>
            <Text style={styles.cancelButtonText}>Cancel payment</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    height: Dimensions.get("window").height - 90,
    // backgroundColor: "red",
  },
  parentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor: "red",
    height: Dimensions.get("window").height - 90,
    paddingBottom: 60,
  },
  blankSpace: {
    height: 500,
    width: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 60,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 25,
    color: colorPalete.silver_silk,
  },
  processingText: {
    fontSize: 35,
    color: colorPalete.eerie_black,
    textAlign: "center",
  },
  footerContiner: {
    width: Dimensions.get("window").width - 60,
    alignSelf: "center",
    backgroundColor: colorPalete.wild_sand,
    padding: 20,
    borderRadius: 10,
  },
  processingContainer: {
    // backgroundColor: "blue",
    // flexDirection: "row"
  },
  retryButtonText: {
    fontSize: 24,
    textAlign: "center",
    color: colorPalete.silver_silk,
    paddingRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: colorPalete.warning,
    marginTop: 15,
  },
  retryContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "center",
  },
  lottieStyle: {
    width: 300,
    height: 300,
    alignSelf: "center",
    // backgroundColor: 'red'
  },
  timerText: {
    fontSize: 16,
    color: colorPalete.silk,
    textAlign: "center",
    marginTop: 10,
  },
});
