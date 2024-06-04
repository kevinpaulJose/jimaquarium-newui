import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";

export const storeData = async ({ value, key }) => {
  try {
    await AsyncStorage.setItem(key ? key : "nokey", JSON.stringify(value));
    return "done";
  } catch (e) {
    console.log(e, "Error setting value");
    return null;
    // saving error
  }
};

export const retrieveData = async ({ key }) => {
  try {
    let item = await AsyncStorage.getItem(key);
    item = JSON.parse(item);
    return item;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const removeData = async ({ key }) => {
  console.log("removing Item", key);
  try {
    const item = await AsyncStorage.removeItem(key);
    return item;
  } catch (e) {
    console.log("e");
    // saving error
    return null;
  }
};

export const checkUserState = ({ setIsUserLoggedIn, setUserDetails }) => {
  // console.log("Checking user state");
  retrieveData({ key: "user" }).then((item) => {
    if (item) {
      setIsUserLoggedIn(true);
      setUserDetails(item);
      //  console.log(item);
      if (item?.name) {
        console.log("logged in");

        return "done";
      } else {
        console.log(item);
        // console.log("Not logged in - no name");
        setTimeout(() => {
          checkUserState({ setIsUserLoggedIn, setUserDetails });
        }, 2000);
      }
    } else {
      // console.log("Not logged in - no instance");
      setTimeout(() => {
        checkUserState({ setIsUserLoggedIn, setUserDetails });
      }, 2000);
    }
  });
};

export const routeTo = ({
  routeStack,
  newPage,
  setPage,
  setRouteStack,
  clearHistory = false,
  stepper = false,
}) => {
  // console.log("running route");
  setPage(newPage);
  let currentStackBuffer = routeStack;
  if (clearHistory) {
    currentStackBuffer = [];
    currentStackBuffer.push(newPage);
  } else if (stepper) {
    currentStackBuffer = [];
    currentStackBuffer.push(navItems[0]);
    currentStackBuffer.push(newPage);
  } else {
    if (
      newPage.page !== currentStackBuffer[currentStackBuffer.length - 1].page
    ) {
      currentStackBuffer.push(newPage);
    }
  }
  setRouteStack(currentStackBuffer);
};
export const routePrevious = ({
  routeStack,
  setPage,
  setRouteStack,
  step = false,
}) => {
  if (routeStack.length === 1) {
    BackHandler.exitApp();
  } else {
    let currentStackBuffer = routeStack;
    // if (step) {
    // currentStackBuffer.pop();
    //   currentStackBuffer.pop();
    // } else {
    currentStackBuffer.pop();
    // }

    setPage(currentStackBuffer[currentStackBuffer.length - 1]);
    setRouteStack(currentStackBuffer);
  }
};
export const navItems = [
  { label: "home", page: "home", id: "456" },
  { label: "archive", page: "cart", id: "986" },
  { label: "container", page: "orders", id: "345" },
  { label: "person", page: "profile", id: "924" },
  { label: "home", page: "productDetail", disabled: true, id: "3462" },
  { label: "checkout", page: "checkout", id: "9241", disabled: true },
  { label: "address", page: "address", id: "9242", disabled: true },
  { label: "orderDetail", page: "orderDetail", id: "9243", disabled: true },
  {
    label: "searchProducts",
    page: "searchProducts",
    id: "9244",
    disabled: true,
  },
  { label: "allProducts", page: "allProducts", id: "9245", disabled: true },
  {
    label: "paymentProcessing",
    page: "paymentProcessing",
    id: "9246",
    disabled: true,
  },
];

export const currency = {
  INR: "₹",
};

// export const API_URL = "http://10.0.2.2:1212/api"
// export const API_URL = "https://server-1vb8.onrender.com/api"
export const API_URL = "https://joannakev.online:1313/api";
// export const API_URL = "http://localhost:1212/api"
export const WEB_URL = "http://localhost:3000";

//UPDATE YOUR CLIENT ID HERE
export const FIREBASE_CLIENT_ID =
  "654317343091-r0rdf3f1qe8ad45ougks4e7nn9b4ivu3.apps.googleusercontent.com";
const pinAmount = {
  "180 - 194": 280,
  "171 - 177": 280,
  "140 - 160": 280,
  "160 - 160": 280,
  "244 - 263": 280,
  "121 - 136": 280,
  "110 - 110": 280,
  "301 - 345": 280,
  "201 - 285": 280,
  "800 - 855": 280,
  "737 - 737": 280,
  "790 - 792": 280,
  "797 - 798": 280,
  "795 - 795": 280,
  "796 - 796": 280,
  "799 - 799": 280,
  "793 - 794": 280,
  "781 - 788": 280,
  "700 - 743": 280,
  "813 - 835": 280,
  "751 - 770": 280,
  "490 - 497": 280,
  "450 - 488": 280,
  "360 - 396": 280,
  "362 - 362": 280,
  "396 - 396": 280,
  "400 - 445": 280,
  "560 - 591": 120,
  "403 - 403": 280,
  "682 - 682": 280,
  "670 - 695": 120,
  "600 - 643": 100,
  "533 - 533": 120,
  "744 - 744": 500,
  "500 - 509": 120,
  "500 - 535": 120,
};
export function findValueByRange(targetNumber) {
  for (const key in pinAmount) {
    const [lowerBound, upperBound] = key.split(" - ").map(Number);
    if (targetNumber >= lowerBound && targetNumber <= upperBound) {
      return pinAmount[key];
    }
  }
  return undefined; // No match found
}

export const adjustCart = ({ cart, products }) => {
  let productIds = products.map((product) => product.productId);
  let updatedCart = cart.filter((v) => productIds.includes(v.productId));
  return updatedCart;
};

export const generateOrderId = (userId) => {
  userId = userId.replace(".", "").toUpperCase();
  let date = Date.now().toString().slice(0, 9);
  let usr = Math.ceil(userId.split("@")[0].length / 2);
  if (usr >= 3) {
    usr = userId.slice(0, 3);
  } else {
    usr = userId.slice(0, usr);
  }
  return `${usr}-${date}`;
};

const getPriceAndName = (products, productId) => {
  const currentProduct = products.filter(
    (product) => product.productId === productId,
  )[0];
  if (currentProduct) {
    return {
      name: currentProduct.name,
      price: currentProduct.price,
    };
  } else {
    return null;
  }
};

const getShipping = (products, pin) => {
  const shippingValues = findValueByRange(parseInt(pin.toString().slice(0, 3)));
  const perGramShipping = shippingValues / 1000;
  let weight = 0;

  products.map((product) => {
    let defaultWeight = parseInt(product.defaultWeight);
    weight += Math.ceil(product.quantity / product.bunch) * defaultWeight;
  });
  let hundreds = weight % 1000;
  if (hundreds !== 0) {
    let difference = 1000 - hundreds;
    let accumulatedWeight = weight + difference;
    return accumulatedWeight * perGramShipping;
  } else {
    let accumulatedWeight = weight + 0;
    return accumulatedWeight * perGramShipping;
  }
};

export const getProductsAndTotal = (cart, products, pin) => {
  const productIDs = cart.map((v) => v.productId);
  const inCartProducts = products
    .filter((product) => productIDs.includes(product.productId))
    .map((v) => {
      const cartQuantity = cart.filter((cv) => cv.productId === v.productId)[0]
        .quantity;
      return {
        ...v,
        quantity: cartQuantity,
      };
    });
  const cartProducts = cart.map((v) => {
    const productWithPriceAndName = getPriceAndName(products, v.productId);
    if (productWithPriceAndName) {
      return {
        id: v.productId,
        quantity: v.quantity,
        price: productWithPriceAndName.price,
        name: productWithPriceAndName.name,
      };
    }
  });
  let total = 0;
  cartProducts.map((v) => {
    if (v?.price) total += parseFloat(v.price) * parseInt(v.quantity);
  });
  return {
    cart: cartProducts,
    total: total,
    shipping: pin !== "no" ? getShipping(inCartProducts, pin) : 0,
  };
};
