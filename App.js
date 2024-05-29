
import { BackHandler, Linking, LogBox, Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import BottomNavigation from './lib/BottomNavigation';
import { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FIREBASE_CLIENT_ID, WEB_URL, checkUserState, generateOrderId, getProductsAndTotal, navItems, removeData, retrieveData, routePrevious, routeTo, storeData } from './lib/utils';
import AppBarWrapper from './lib/AppBarWrapper';
import Home from './lib/Home/Home';
import Cart from './lib/Cart/Cart';
import Orders from './lib/Orders/Orders';
import Profile from './lib/Profile/Profile';
import HomeAppBar from './lib/Home/HomeAppBar';
import ProductDetailAppBar from './lib/ProductDetail/ProductDetailAppBar';
import ProductDetails from './lib/ProductDetail/ProductDetails';
import AppBarGeneric from './lib/Shared/AppBarGeneric';
import Checkout from './lib/Checkout/Checkout';
import UpdateAddress from './lib/Address/UpdateAddress';
import OrderDetail from './lib/OrderDetail/OrderDetail';
import ProfileAppBar from './lib/Profile/ProfileAppBar';
import SearchPage from './lib/Search/SearchPage';
import SearchAppBar from './lib/Search/SearchAppBar';
import AllProducts from './lib/AllProducts/AllProducts';
import SnackBar from './lib/Shared/SnackBar';
import makeApiRequest from './lib/api';
import PaymentProcessing from './lib/PaymentProcessing/PaymentProcessing';
import { paymentMethod } from './lib/constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppLoadingScreen } from './lib/Shared/AppLoadingScreen';


const queryClient = new QueryClient();
export const AppContext = createContext(null);
// const currectUser = retrieveData({ key: "user" })
export default function App() {

  const [page, setPage] = useState({ label: "home", page: "home" });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  // let localOrderId = retrieveData({ key: "orderId" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPage, setSelectedPage] = useState("Cart");
  const [selectedProduct, setSelectedProduct] = useState(
    []
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [address, setAddress] = useState([]);
  const [orders, setOrders] = useState([]);

  const [openSnackBarContent, setOpenSnackbarContent] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [openSnackBar, setOpenSnackbar] = useState(false);
  // const [fabContent, setFabContent] = useState("");
  // const [fabIcon, setFabIcon] = useState(<ShoppingCartIcon />);
  // const [width, setWidth] = useState(window.innerWidth);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [upiMethod, setUpiMethod] = useState("Google Pay");
  const [syncing, setSyncing] = useState(false);
  const [loadingCache, setLoadingCache] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [routeStack, setRouteStack] = useState([{ label: "home", page: "home" }]);
  const [productCartSaving, setProductCartSaving] = useState(false);
  const [addressSaving, setAddressSaving] = useState(false)
  const [shipping, setShipping] = useState(0);

  const [name, setName] = useState(selectedAddress !== null ? selectedAddress?.name : "");
  const [line1, setLine1] = useState(selectedAddress !== null ? selectedAddress?.line1 : "");
  const [line2, setLine2] = useState(selectedAddress !== null ? selectedAddress?.line2 : "");
  const [city, setCity] = useState(selectedAddress !== null ? selectedAddress?.city : "");
  const [userState, setUserState] = useState(selectedAddress !== null ? selectedAddress?.state : "");
  const [pin, setPin] = useState(selectedAddress !== null ? selectedAddress?.pin : "");
  const [phone, setPhone] = useState(selectedAddress !== null ? selectedAddress?.phone : "");
  const [user, setUser] = useState("");
  const [cartAndOthersLoading, setCartAndOthersLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [consent, setConsent] = useState({
    label: "e",
    action: () => { },
    visible: false,
    activeLabel: ""
  })


  useEffect(() => {
    setName(selectedAddress !== null ? selectedAddress?.name : "");
    setLine1(selectedAddress !== null ? selectedAddress?.line1 : "");
    setLine2(selectedAddress !== null ? selectedAddress?.line2 : "");
    setCity(selectedAddress !== null ? selectedAddress?.city : "");
    setUserState(selectedAddress !== null ? selectedAddress?.state : "");
    setPin(selectedAddress !== null ? selectedAddress?.pin : "");
    setPhone(selectedAddress !== null ? selectedAddress?.phone : "");
  }, [selectedAddress])


  const redirectOrder = async () => {
    const orderId = await retrieveData({ key: "orderId" });
    if (orderId) {
      routeTo({ routeStack, newPage: navItems[10], setPage, setRouteStack, clearHistory: true })
    }
  }
  useEffect(() => {
    redirectOrder();
  }, []);

  async function onAuthStateChanged(user) {
    console.log("Setting User - ", user);
    if (user) {
      setCartAndOthersLoading(true);
      setUser(user);
      setUserDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      });
      await storeData({
        key: "user", value: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }
      });
      Promise.all([
        cartAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setCart
        ),
        addressAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setAddress
        ),
        ordersAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setOrders
        ),
      ])
        .then(() => {
         

        })
        .catch((e) => {
          console.log(e);
          // setInitialTotal();
          // setAppLoading(false);
        }).finally(() => {
          setCartAndOthersLoading(false);
          setAppLoading(false);
        })
    } else {
      setUserDetails({

      });
      await removeData({ key: "user" })
    }

    // if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const RenderPage = () => {
    switch (page.page) {
      case "home":
        return {
          content: <Home />, appBar: <HomeAppBar /> }
      case "searchProducts":
        return { content: <SearchPage />, appBar: <SearchAppBar /> }
      case "allProducts":
        return {
          content: <AllProducts />, appBar: <AppBarGeneric title={selectedCategory === "" ? "All Products" : selectedCategory}
            customAction={() => setSelectedCategory("")} />
        }
      case "productDetail":
        return { content: <ProductDetails />, appBar: <ProductDetailAppBar /> }
      case "cart":
        return { content: <Cart />, appBar: <AppBarGeneric title={"Shopping Cart"} /> }
      case "orders":
        return { content: <Orders />, appBar: <AppBarGeneric title={"Orders"} /> }
      case "profile":
        return { content: <Profile />, appBar: <ProfileAppBar /> }
      case "checkout":
        return { content: <Checkout />, appBar: <AppBarGeneric title={"Checkout"} /> }
      case "address":
        return {
          content: <UpdateAddress />, appBar: <AppBarGeneric title={"Address"} customAction={() =>
            routePrevious({ routeStack, setPage, setRouteStack, step: true })
          } />
        }
      case "orderDetail":
        return { content: <OrderDetail />, appBar: <AppBarGeneric title={"Order Detail"} /> }
      case "paymentProcessing":
        return { content: <PaymentProcessing />, appBar: <AppBarGeneric title={""} disableBackButton /> }
      default:
        return { content: <Home />, appBar: <HomeAppBar /> }
    }
  }

  useEffect(() => {
    const backAction = () => {
      routePrevious({ routeStack, setPage, setRouteStack })
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    checkUserState({ setIsUserLoggedIn: setIsUserLoggedIn, setUserDetails: setUserDetails });

  }, [])





  // const productsAPI = async () => {
  //   // const cachedProducts = await db.table('product').toArray();
  //   // if (cachedProducts.length > 0) {
  //   //   setLoadingCache(true);
  //   //   console.log("Cashed items");
  //   //   let categoriesArray = [];
  //   //   const tempCategoriesArray = cachedProducts.map(
  //   //     (object) => object.categories
  //   //   );
  //   //   categoriesArray = [...new Set(tempCategoriesArray)];
  //   //   backgroundSyncProduct();
  //   //   setCategories(categoriesArray);
  //   //   setProducts(cachedProducts);
  //   //   setLoadingCache(false);
  //   // } else {
  //   let cachedProducts = await retrieveData({ key: "products" });
  //   if (cachedProducts) {
  //     console.log("Restoring from cached Products");
  //     setProducts(cachedProducts.products);

  //   } else {
  //     setLoadingCache(false);
  //     setProductLoading(true);
  //     try {
  //       let res = await makeApiRequest(
  //         "GET",
  //         {},
  //         "/products/all",
  //         setSnackSeverity,
  //         setOpenSnackbar,
  //         setOpenSnackbarContent,
  //         false
  //       );

  //       if (res?.status === 200) {
  //         let categoriesArray = [];
  //         if (res?.products) {
  //           // console.log(res.products);
  //           const product = res.products;
  //           // await db.table('product').bulkAdd(product);
  //           // const cachedProducts = await db.table('products').toArray();
  //           // console.log(cachedProducts);
  //           const tempCategoriesArray = res?.products?.map(
  //             (object) => object.categories
  //           );
  //           categoriesArray = [...new Set(tempCategoriesArray)];
  //         }
  //         setCategories(categoriesArray);
  //         setProducts(res?.products);
  //         await storeData({ key: "products", value: { producs: res?.products } })
  //       }
  //     } catch (e) {
  //     } finally {
  //       setProductLoading(false);
  //     }
  //   }

  //   // }

  // };


  useEffect(() => {
    if (products.length === 0) {
      setAppLoading(true);
      setCartAndOthersLoading(true);
      Promise.all([
        // productsAPI(),
        cartAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setCart
        ),
        addressAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setAddress
        ),
        ordersAPI(
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          setOrders
        ),
      ])
        .then(() => {
          setAppLoading(false);

        })
        .catch((e) => {
          console.log(e);
          // setInitialTotal();
          // setAppLoading(false);
        }).finally(() => {
          setAppLoading(false);
          setCartAndOthersLoading(false);
        })
    } else {

      console.log("NOT Calling API");
    }
  }, []);

  return (
    <AppContext.Provider value={{
      page, setPage, isUserLoggedIn, setIsUserLoggedIn, userDetails, setUserDetails,

      selectedCategory,
      setSelectedCategory,
      // width,
      selectedPage,
      setSelectedPage,
      selectedProduct,
      setSelectedProduct,
      setOpenSnackbar,
      setOpenSnackbarContent,
      setSnackSeverity,
      products,
      setProducts,
      categories,
      setCategories,
      cart,
      setCart,
      address,
      setAddress,
      orders,
      setOrders,
      total,
      setTotal,
      orderId,
      setOrderId,
      upiMethod,
      setUpiMethod,
      loadingCache,
      openSnackBarContent,
      snackSeverity,
      openSnackBar,
      syncing, setSyncing, setLoadingCache, routeStack,
      setRouteStack, selectedAddress, setSelectedAddress,
      selectedOrder, setSelectedOrder,
      searchText, setSearchText,
      productCartSaving, setProductCartSaving,
      addressSaving, setAddressSaving,
      name, setName, line1, setLine1, line2, setLine2, city, setCity, userState, setUserState,
      pin, setPin, phone, setPhone,
      shipping, setShipping,
      loggingOut, setLoggingOut,
      cartAndOthersLoading, setCartAndOthersLoading,
      consent, setConsent,
      loggingIn, setLoggingIn,
      productLoading, setProductLoading
    }}>

      {/* <View style={{height: Platform.OS === "ios" ? 40 : 0, width: 2}}>

      </View> */}
      {openSnackBar && <SnackBar />}
      <QueryClientProvider client={queryClient}>
        <AppBarWrapper child={<>
          {RenderPage().appBar}
        </>} />
      </QueryClientProvider>

      <View style={styles.container}>
        {RenderPage().content}
      </View>
          {products.length === 0 && <AppLoadingScreen />}

      <BottomNavigation />
    </AppContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    // height: "75%"
  }
})

export const cartAPI = async (
  setSnackSeverity,
  setOpenSnackbar,
  setOpenSnackbarContent,
  setCart
) => {
  let userDetails = await retrieveData({ key: "user" });
  try {
    if (userDetails?.name) {
      let res = await makeApiRequest(
        "POST",
        { userId: userDetails?.email },
        "/cart/get",
        setSnackSeverity,
        setOpenSnackbar,
        setOpenSnackbarContent,
        false
      );

      if (res?.status === 200) {
        if (res?.cart) {
          setCart(res?.cart?.cart);
        }
      }
      if (res?.status === 201) {
        setCart([]);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const addressAPI = async (
  setSnackSeverity,
  setOpenSnackbar,
  setOpenSnackbarContent,
  setAddress
) => {
  let userDetails = await retrieveData({ key: "user" });
  try {
    if (userDetails?.name) {
      let res = await makeApiRequest(
        "POST",
        { userId: userDetails?.email },
        "/address/get",
        setSnackSeverity,
        setOpenSnackbar,
        setOpenSnackbarContent,
        false
      );

      if (res?.status === 200) {
        if (res?.address) {
          setAddress(res?.address);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const ordersAPI = async (
  setSnackSeverity,
  setOpenSnackbar,
  setOpenSnackbarContent,
  setOrders
) => {
  let userDetails = await retrieveData({ key: "user" });
  try {
    if (userDetails?.email) {
      let res = await makeApiRequest(
        "POST",
        { userId: userDetails?.email },
        "/orders/get",
        setSnackSeverity,
        setOpenSnackbar,
        setOpenSnackbarContent,
        false
      );

      if (res?.status === 200) {
        if (res?.orders) {
          setOrders(res?.orders);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const addToCartAPI = async ({
  recalled = false,
  setSaving,
  setCart,
  setSnackSeverity,
  setOpenSnackbar,
  setOpenSnackbarContent,
  cart,
  selectedProduct,
  fromCart = false,
  operator,
  reload = false,
  isPlacedOrder = false,
  setOrders,
  reOrder = false,
  payload = [],
  setPage, setRouteStack, routeStack, setIsUserLoggedIn, setUserDetails
}) => {
  const userDetails = await retrieveData({ key: "user" })
  setSaving(true);
  // console.log("selected", selectedProduct);
  if (selectedProduct) {
    if (userDetails?.email) {
      let updatedLocalCart = cart;
      if (recalled) {
        let res = await makeApiRequest(
          "POST",
          { userId: userDetails?.email },
          "/cart/get",
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          false
        );
        if (res) {
          if (res.status === 200) {
            updatedLocalCart = res?.cart?.cart;
          } else {
            updatedLocalCart = [];
          }
        }
      }

      if (!isPlacedOrder) {
        const currentProductIndex = updatedLocalCart.findIndex(
          (c) => c.productId === selectedProduct.productId
        );
        if (currentProductIndex !== -1) {
          if (operator === "+") {
            updatedLocalCart[currentProductIndex].quantity =
              parseInt(updatedLocalCart[currentProductIndex].quantity) + 1;
          } else {
            if (
              parseInt(updatedLocalCart[currentProductIndex].quantity) - 1 ===
              0
            ) {
              updatedLocalCart.splice(currentProductIndex, 1);
            } else {
              updatedLocalCart[currentProductIndex].quantity =
                parseInt(updatedLocalCart[currentProductIndex].quantity) - 1;
            }
          }
        } else {
          if (reOrder) {
            updatedLocalCart = payload;
          } else {
            updatedLocalCart.push({
              id: Date.now() + Math.random().toFixed(),
              productId: selectedProduct.productId,
              quantity: 1,
            });
          }
        }
      } else {
        updatedLocalCart = [];
      }
      console.log("Add to cart is called");
      makeApiRequest(
        "POST",
        {
          userId: userDetails?.email,
          cart: updatedLocalCart,
        },
        "/cart/add",
        setSnackSeverity,
        setOpenSnackbar,
        setOpenSnackbarContent,
        false
      )
        .then(async (res) => {
          if (res?.status === 200) {
            if (res?.cart) {
              console.log("Add to cart is called - done");
              let orderId = await retrieveData({ key: "orderId" });
              setCart(res?.cart);
              setSaving(false);
              if (orderId) {
                routeTo({ routeStack, newPage: navItems[10], setPage, setRouteStack, clearHistory: true })
              } else {
                routeTo({ routeStack, newPage: navItems[1], setPage, setRouteStack })
              }

              if (!fromCart) {
                if (reOrder) {
                  // setSidePage("Menu");
                  // setSubPage("address");
                } else {
                  // setSidePage("Menu");
                  // setSubPage("cart");
                }
              }
            }
          } else if (res?.status === 201) {
            setCart(res?.cart);
            setSnackSeverity("warning");
            setOpenSnackbar(true);
            setOpenSnackbarContent("Some items are adjusted as per availability");
            setSaving(false);
            routeTo({ routeStack, newPage: navItems[1], setPage, setRouteStack })
            if (!fromCart) {
              // setSidePage("Menu");
              // setSubPage("cart");
            }
          } else {
            setSaving(false);
          }
        })
        .catch((e) => {
          console.log(e);
          setSnackSeverity("error");
          setOpenSnackbar(true);
          setOpenSnackbarContent("Error adding to cart. Please try again later");
          setSaving(false);
        }).finally(() => {
          setSaving(false);
        })
    } else {
      setSaving(false);
      setSnackSeverity("warning");
      setOpenSnackbarContent("Please Login to Add to Cart");
      setOpenSnackbar(true);
      // let response = await login({setIsUserLoggedIn, setUserDetails});
      // console.log(response);
      // if (response) {
      //   await cartAPI(
      //     setSnackSeverity,
      //     setOpenSnackbar,
      //     setOpenSnackbarContent,
      //     setCart
      //   );
      //   await addressAPI(
      //     setSnackSeverity,
      //     setOpenSnackbar,
      //     setOpenSnackbarContent,
      //     setAddress
      //   );
      //   await ordersAPI(
      //     setSnackSeverity,
      //     setOpenSnackbar,
      //     setOpenSnackbarContent,
      //     setOrders
      //   );

      //   await addToCartAPI({
      //     recalled: true,
      //     cart: cart,
      //     selectedProduct: selectedProduct,
      //     setCart: setCart,
      //     setOpenSnackbar: setOpenSnackbar,
      //     setOpenSnackbarContent: setOpenSnackbarContent,
      //     setSaving: setSaving,
      //     setSnackSeverity: setSnackSeverity,
      //     fromCart: false,
      //     operator: "+",
      //     setAddress: setAddress,
      //     setOrders: setOrders,
      //     setPage, setRouteStack, routeStack,  setIsUserLoggedIn, setUserDetails
      //   });
      // } else {
      //   setSaving(false);
      // }
    }
  } else {
    setSnackSeverity("warning");
    setOpenSnackbarContent("Products are not in stock");
    setOpenSnackbar(true);
    setSaving(false);
  }

};

export const createOrder_upi = async ({
  userDetails,
  address,
  setSnackSeverity,
  setOpenSnackbar,
  setOpenSnackbarContent,
  setCart,
  selectedProduct,
  setAddress,
  setOrders,
  orders,
  products,
  cart,
  setPage,
  routeStack, setRouteStack, setIsUserLoggedIn, setUserDetails
}) => {
  try {
    // if (isMobile) {
    if (userDetails?.email) {
      const order_id = generateOrderId(userDetails?.email);
      const localAddress = address.filter((v) => v.default)[0].line1 + address.filter((v) => v.default)[0].line2 + address.filter((v) => v.default)[0].city + address.filter((v) => v.default)[0].pin
      const phoneNumber = address.filter((v) => v.default)[0].phone;
      let productsInCart = getProductsAndTotal(
        cart,
        products,
        address.filter((v) => v.default)[0].pin
      );



      const amountToPay = (parseFloat(productsInCart.total) + parseFloat(productsInCart.shipping)).toString();
      await storeData({ key: "amount", value: { amount: amountToPay } });
      await storeData({ key: "startTime", value: { startTime: Date.now() } });
      await storeData({ key: "orderId", value: { orderId: order_id } });
      const reqBody = {
        userId: userDetails?.email,
        orderId: order_id,
        products: productsInCart.cart,
        total: productsInCart.total,
        status: "Order Recieved",
        paymentStatus: "Payment Processing",
        box: "true",
        shipping: productsInCart.shipping,
        address: address.filter((v) => v.default)[0],
      };
      try {
        // let res = await makeApiRequest(
        //   "POST",
        //   {
        //     email: userDetails?.email,
        //     phone: address.filter((v) => v.default)[0].phone,
        //     order_id: order_id,
        //     amount:
        //       parseFloat(productsInCart.shipping) +
        //       parseFloat(productsInCart.total),
        //   },
        //   "/orders/exec",
        //   setSnackSeverity,
        //   setOpenSnackbar,
        //   setOpenSnackbarContent,
        //   false
        // );


        let paymentLink = '';
        //add cash free exec
        if (paymentMethod.cashfree) {
          let res = await makeApiRequest(
            "POST",
            {
              email: userDetails?.email,
              phone: address.filter((v) => v.default)[0].phone,
              order_id: order_id,
              amount:
                parseFloat(productsInCart.shipping) +
                parseFloat(productsInCart.total),
            },
            "/orders/exec",
            setSnackSeverity,
            setOpenSnackbar,
            setOpenSnackbarContent,
            false
          );
          if (res?.code === 200) {
            paymentLink = res?.data?.payment_link;
            await storeData({ key: "paymentLink", value: { paymentLink: paymentLink } });
          }
        } else if (paymentMethod.sabPaise) {
          paymentLink = `${WEB_URL}/pay?name=${userDetails?.name}?address=${localAddress}?amount=1?phone=${phoneNumber}?orderId=${order_id}?email=${userDetails?.email}`;
          await storeData({ key: "paymentLink", value: { paymentLink: paymentLink } });
        }




        let res1 = await makeApiRequest(
          "POST",
          {
            ...reqBody,
            paymentLink: paymentLink,
            tracking: ""
          },
          "/orders/add",
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent,
          false
        );

        if (res1?.status === 200) {
          setCart([]);
          await addToCartAPI({
            recalled: false,
            setSaving: () => { },
            setCart: setCart,
            setSnackSeverity: setSnackSeverity,
            setOpenSnackbar: setOpenSnackbar,
            cart: [],
            operator: "-",
            selectedProduct: selectedProduct,
            setOpenSnackbarContent: setOpenSnackbarContent,
            fromCart: true,
            isPlacedOrder: true,
            reload: false,
            setAddress: setAddress,
            setOrders: setOrders,
            setPage: setPage,
            routeStack, setRouteStack, setIsUserLoggedIn, setUserDetails

          });

          let currentOrders = orders;
          currentOrders.unshift(reqBody);
          setOrders(currentOrders);
          if (paymentLink) {

            if (Platform.OS !== 'web') {
              Linking.openURL(paymentLink)
            } else {
              window.open(paymentLink, "_blank").focus();
            }
            // setSidePage("Loading");
            // setSubPage("loading");
            // setOrderId(order_id);
            // localStorage.setItem("orderId", order_id);
            // localStorage.setItem("link", JSON.stringify(links));
            // localStorage.setItem("mode", upiMethod)


            // if (isMobile)
            //   window.location.href = paymentLink;
          }
        }
      } catch (e) {
        console.log(e);
      }


    }
  } catch (e) {
    console.log(e);
  }
};

async function onGoogleButtonPress() {
  // Get the user's ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const login = async ({ loggingIn,  setLoggingIn }) => {
  if(!loggingIn) {
    setLoggingIn(true);
    GoogleSignin.configure({
      webClientId: FIREBASE_CLIENT_ID,
    });
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      .catch(e => console.log(e))
      .finally(() => setLoggingIn(false))
  }
 
  // await storeData({
  //   value: {
  //     name: "Kevin",
  //     email: "bkevin1999@gmail.com"
  //   }, key: "user"
  // });
  // const res = checkUserState({ setIsUserLoggedIn, setUserDetails });
  // if(Platform.OS !== "web") 
  //   await Updates.reloadAsync();
  // else 
  //   window.location.reload();
  // return res;

}

export const logout = async ({ setIsUserLoggedIn, setUserDetails,
  setAddress, setOrders,
  setCart,
  setLoggingOut, loggingOut
}) => {
  if(!loggingOut) {
    try {
      setLoggingOut(true);
  GoogleSignin.configure({
    webClientId: FIREBASE_CLIENT_ID,
  });
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
  auth().signOut()
  await removeData({ key: "user" });
  setIsUserLoggedIn(false);
  setUserDetails({});
  setAddress([]);
  setOrders([]);
  setCart([]);
    }
    catch(e){
      console.log(e);
    } finally {
      setLoggingOut(false)
    }
  } 

}