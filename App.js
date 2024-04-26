
import { BackHandler, LogBox, StyleSheet, Text, View, StatusBar, Platform, SafeAreaView } from "react-native";
import BottomNavigation from "./lib/BottomNavigation";
import { createContext, useEffect, useState } from "react";
import { retrieveData, routePrevious } from "./lib/utils";
import AppBarWrapper from "./lib/AppBarWrapper";
import Home from "./lib/Home/Home";
import Cart from "./lib/Cart/Cart";
import Orders from "./lib/Orders/Orders";
import Profile from "./lib/Profile/Profile";
import HomeAppBar from "./lib/Home/HomeAppBar";
import ProductDetailAppBar from "./lib/ProductDetail/ProductDetailAppBar";
import ProductDetails from "./lib/ProductDetail/ProductDetails";
import AppBarGeneric from "./lib/Shared/AppBarGeneric";
import Checkout from "./lib/Checkout/Checkout";
import UpdateAddress from "./lib/Address/UpdateAddress";
import OrderDetail from "./lib/OrderDetail/OrderDetail";
import ProfileAppBar from "./lib/Profile/ProfileAppBar";
import SearchPage from "./lib/Search/SearchPage";
import SearchAppBar from "./lib/Search/SearchAppBar";
import AllProducts from "./lib/AllProducts/AllProducts";

export const AppContext = createContext(null);

export default function App() {
  const currectUser = retrieveData({ key: "user" });
  const [page, setPage] = useState({ label: "home", page: "home" });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    currectUser?.name ? true : false
  );
  const [userDetails, setUserDetails] = useState(
    currectUser?.name ? currectUser : {}
  );
  let localOrderId = retrieveData({ key: "orderId" });

  const [subPage, setSubPage] = useState("allProducts");
  const [sidePage, setSidePage] = useState("Categories");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPage, setSelectedPage] = useState("Cart");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Common",
    "Exotic",
    "Guppy",
    "Accessories",
    "Gold Fish",
    "Big Size Fishes",
  ]);
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
  const [routeStack, setRouteStack] = useState([
    { label: "home", page: "home" },
  ]);

  const RenderPage = () => {
    switch (page.page) {
      case "home":
        return { content: <Home />, appBar: <HomeAppBar /> };
      case "searchProducts":
        return { content: <SearchPage />, appBar: <SearchAppBar /> };
      case "allProducts":
        return {
          content: <AllProducts />,
          appBar: (
            <AppBarGeneric
              title={
                selectedCategory === "" ? "All Products" : selectedCategory
              }
              customAction={() => setSelectedCategory("")}
            />
          ),
        };
      case "productDetail":
        return { content: <ProductDetails />, appBar: <ProductDetailAppBar /> };
      case "cart":
        return {
          content: <Cart />,
          appBar: <AppBarGeneric title={"Shopping Cart"} />,
        };
      case "orders":
        return {
          content: <Orders />,
          appBar: <AppBarGeneric title={"Orders"} />,
        };
      case "profile":
        return { content: <Profile />, appBar: <ProfileAppBar /> };
      case "checkout":
        return {
          content: <Checkout />,
          appBar: <AppBarGeneric title={"Checkout"} />,
        };
      case "address":
        return {
          content: <UpdateAddress />,
          appBar: <AppBarGeneric title={"Address"} />,
        };
      case "orderDetail":
        return {
          content: <OrderDetail />,
          appBar: <AppBarGeneric title={"Order Detail"} />,
        };
      default:
        return { content: <Home />, appBar: <HomeAppBar /> };
    }
  };
  // LogBox.ignoreLogs([/list should have a/]);
  useEffect(() => {
    const backAction = () => {
      routePrevious({ routeStack, setPage, setRouteStack });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    // return backHandler.remove();
  }, []);

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        isUserLoggedIn,
        setIsUserLoggedIn,
        userDetails,
        setUserDetails,
        subPage,
        setSubPage,
        sidePage,
        setSidePage,
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
        syncing,
        setSyncing,
        setLoadingCache,
        routeStack,
        setRouteStack,
        selectedAddress,
        setSelectedAddress,
        selectedOrder,
        setSelectedOrder,
        searchText,
        setSearchText,
      }}
    >
      <AppBarWrapper child={<>{RenderPage().appBar}</>} />
        <View>{RenderPage().content}</View>

      <BottomNavigation />

        
        
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS !== "web" ? StatusBar.currentHeight: 0
  },
});
