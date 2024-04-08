import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigation from './lib/BottomNavigation';
import { createContext, useState } from 'react';
import { retrieveData } from './lib/utils';
import AppBarWrapper from './lib/AppBarWrapper';
import Home from './lib/Home/Home';
import Cart from './lib/Cart/Cart';
import Orders from './lib/Orders/Orders';
import Profile from './lib/Profile/Profile';
import HomeAppBar from './lib/Home/HomeAppBar';
import ProductDetailAppBar from './lib/ProductDetail/ProductDetailAppBar';
import ProductDetails from './lib/ProductDetail/ProductDetails';

export const AppContext = createContext(null);

export default function App() {
  const currectUser = retrieveData("user")
  const [page, setPage] = useState({ label: "home", page: "home" });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(currectUser?.name ? true : false);
  const [userDetails, setUserDetails] = useState(currectUser?.name ? currectUser : {});
  let localOrderId = retrieveData("orderId");

  const [subPage, setSubPage] = useState("allProducts");
  const [sidePage, setSidePage] = useState("Categories");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPage, setSelectedPage] = useState("Cart");
  const [selectedProduct, setSelectedProduct] = useState(
    []
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
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
  const [upiMethod, setUpiMethod] = useState("Google Pay");
  const [syncing, setSyncing] = useState(false);
  const [loadingCache, setLoadingCache] = useState(true);
  const [routeStack, setRouteStack] = useState([{ label: "home", page: "home" }]);

  const RenderPage = () => {
    switch (page.page) {
      case "home":
        return { content: <Home />, appBar: <HomeAppBar /> }
      case "productDetail":
        return { content: <ProductDetails />, appBar: <ProductDetailAppBar /> }
      case "cart":
        return { content: <Cart />, appBar: <HomeAppBar /> }
      case "orders":
        return { content: <Orders />, appBar: <HomeAppBar /> }
      case "profile":
        return { content: <Profile />, appBar: <HomeAppBar /> }
      default:
        return { content: <Home />, appBar: <HomeAppBar /> }
    }
  }

  return (
    <AppContext.Provider value={{
      page, setPage, isUserLoggedIn, setIsUserLoggedIn, userDetails, setUserDetails, subPage,
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
      syncing, setSyncing, setLoadingCache, routeStack, setRouteStack
    }}>

        <AppBarWrapper child={<>
          {RenderPage().appBar}
        </>} />
        {RenderPage().content}

      <BottomNavigation />
    </AppContext.Provider>

  );
}
