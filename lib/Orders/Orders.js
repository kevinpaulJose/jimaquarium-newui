import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { dummyOrders, dummyProducts } from "../Temp/dummy";
import { colorPalete } from "../constants";
import DashedLine from "./Shared/DashedLine";
import React, { useContext } from "react";
import { navItems, routeTo } from "../utils";
import { AppContext } from "../../App";
import NotLoggedInComponent from "../Shared/NotLoggedInComponent";
import LottieView from "lottie-react-native";

export default function Orders() {
    const {setSelectedOrder, setRouteStack, routeStack, setPage, userDetails, orders, products } = useContext(AppContext);

    const getStatusColor = ({status}) => {
        switch (status) {
            case "Shipped": 
                return {color: colorPalete.zobra, text: "Shipped"}
            case "Payment Failed":
                return {color: colorPalete.danger, text: "Payment Failed"}
            default:
                return {color: colorPalete.lima, text: `Estimated Delivery on ${new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long' }).format(new Date(Date.now() + 86400000 * 2))}`}
        }
    }
    const setAndRedirect = ({order}) => {
        setSelectedOrder(order);
        routeTo({setRouteStack, routeStack, setPage, newPage: navItems[7]});
    }
    return (
        userDetails.name ? 
            <ScrollView showsVerticalScrollIndicator={false}>
                {orders.length === 0 && 
                
                // <ScrollView automaticallyAdjustKeyboardInsets>
                                <View style={styles.lottie} >
                                <LottieView style={styles.lottie} loop={false} autoPlay source={require('../../assets/emptyOrder.json')} />

                                 </View>
                                
                            // </ScrollView>
                            }
            {orders.map((order, index) => (
                <React.Fragment key={`${order.id}-${index}`}>
                    <Pressable onPress={() => setAndRedirect({order: order})}  style={styles.container} >
                        <View style={styles.textContainer}>
                            <Text style={styles.orderTitleText}>
                                {`Order#: ${order.orderId}`}
                            </Text>
                            <Text style={styles.orderDescText}>
                                {`${new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(Date.now()))}`}
                            </Text>
                            <Text style={{...styles.orderStatusText, color: getStatusColor({status: order.paymentStatus !== "Failed" ?  order.status : "Payment Failed"}).color}}>
                                {getStatusColor({status: order.paymentStatus !== "Failed" ?  order.status : "Payment Failed"}).text}
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: products.filter(p => p.productId === order.products[0].id)[0].img }} />
                            {order.products.length - 1 > 0 &&
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {`+${order.products.length - 1}`}
                                    </Text>
                                </View>
                            }

                        </View>
                    </Pressable>
                    <DashedLine />
                </React.Fragment>
            ))}


        </ScrollView>
        : 
        <NotLoggedInComponent />
        

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        // marginBottom: 10

    },
    textContainer: {
        flexDirection: "column",
        // backgroundColor: "yellow"
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        // backgroundColor: "orange",
        alignSelf: "flex-end",
        borderRadius: 7
    },
    imageContainer: {
        // backgroundColor: "blue",
        flex: 1,
        paddingRight: 10
    },
    orderTitleText: {
        fontWeight: "700",
        fontSize: 20,
        color: colorPalete.silver_silk
    },
    orderDescText: {
        fontSize: 16,
        color: colorPalete.silver,
        marginTop: 3
    },
    orderStatusText: {
        fontSize: 16,
        // color: colorPalete.lima,
        marginTop: 7
    },
    badge: {
        backgroundColor: colorPalete.wild_sand,
        position: "absolute",
        padding: 7,
        borderRadius: 100,
        right: 0
    },
    badgeText: {
        fontSize: 11,
        color: colorPalete.silver_silk
    }, 
    lottie: {
        width: 300,
        height: 300,
        alignSelf: "center"
    }
})

