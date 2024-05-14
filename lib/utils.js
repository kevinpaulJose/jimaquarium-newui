import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';

export const storeData = async ({ value, key }) => {
  try {
    await AsyncStorage.setItem(key ? key : "nokey", JSON.stringify(value));
    return "done"
  } catch (e) {
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
  console.log("removing Item");
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
  console.log("Checking user state");
  retrieveData({ key: "user" }).then((item) => {
    if (item) {
      setIsUserLoggedIn(true);
      setUserDetails(item)
      //  console.log(item);
      if (item?.name) {
        console.log("logged in");
        
        return "done"
      } else {
        console.log(item);
        console.log("Not logged in - no name");
        setTimeout(() => {
          checkUserState({ setIsUserLoggedIn, setUserDetails })
        }, 2000)
      }

    } else {
      console.log("Not logged in - no instance");
      setTimeout(() => {
        checkUserState({ setIsUserLoggedIn, setUserDetails })
      }, 2000)
    }
  })
}

export const routeTo = ({ routeStack, newPage, setPage, setRouteStack, clearHistory = false, stepper = false }) => {
  // console.log("running route");
  setPage(newPage);
  let currentStackBuffer = routeStack;
  if(clearHistory) {
    currentStackBuffer = [];
    currentStackBuffer.push(newPage);
  } else if(stepper) {
    currentStackBuffer = [];
    currentStackBuffer.push(navItems[0]);
    currentStackBuffer.push(newPage);
  } else {
    if (newPage.page !== currentStackBuffer[currentStackBuffer.length - 1].page) {
      currentStackBuffer.push(newPage);
    }
  }
  setRouteStack(currentStackBuffer);

}
export const routePrevious = ({ routeStack, setPage, setRouteStack, step = false }) => {
  if (routeStack.length === 1) {
    BackHandler.exitApp();
  } else {
    let currentStackBuffer = routeStack;
    if (step) {
      currentStackBuffer.pop();
      currentStackBuffer.pop();
    } else {
      currentStackBuffer.pop();
    }

    setPage(currentStackBuffer[currentStackBuffer.length - 1]);
    setRouteStack(currentStackBuffer);
  }
}
export const navItems = [
  { label: "home", page: "home", id: "456" },
  { label: "archive", page: "cart", id: "986" },
  { label: "container", page: "orders", id: "345" },
  { label: "person", page: "profile", id: "924" },
  { label: "home", page: "productDetail", disabled: true, id: "3462" },
  { label: "checkout", page: "checkout", id: "9241", disabled: true },
  { label: "address", page: "address", id: "9242", disabled: true },
  { label: "orderDetail", page: "orderDetail", id: "9243", disabled: true },
  { label: "searchProducts", page: "searchProducts", id: "9244", disabled: true },
  { label: "allProducts", page: "allProducts", id: "9245", disabled: true },
  { label: "paymentProcessing", page: "paymentProcessing", id: "9246", disabled: true },

];

export const currency = {
  "INR": "₹"
}

export const API_URL = "http://localhost:1212/api"
export const WEB_URL = "http://localhost:3000"
const pinAmount = {
  "180 - 194": 120,
  "171 - 177": 120,
  "140 - 160": 120,
  "160 - 160": 120,
  "244 - 263": 120,
  "121 - 136": 120,
  "110 - 110": 120,
  "301 - 345": 120,
  "201 - 285": 120,
  "800 - 855": 120,
  "737 - 737": 120,
  "790 - 792": 120,
  "797 - 798": 120,
  "795 - 795": 120,
  "796 - 796": 120,
  "799 - 799": 120,
  "793 - 794": 120,
  "781 - 788": 120,
  "700 - 743": 120,
  "813 - 835": 120,
  "751 - 770": 120,
  "490 - 497": 120,
  "450 - 488": 120,
  "360 - 396": 120,
  "362 - 362": 120,
  "396 - 396": 120,
  "400 - 445": 120,
  "560 - 591": 120,
  "403 - 403": 120,
  "682 - 682": 120,
  "670 - 695": 120,
  "600 - 643": 50,
  "533 - 533": 120,
  "744 - 744": 120,
  "500 - 509": 120,
  "500 - 535": 120
}
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
    (product) => product.productId === productId
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
    let hundreds = defaultWeight % 1000;
    let difference = 1000 - hundreds;
    let accumulatedWeight = defaultWeight + difference;
    weight += Math.ceil(product.quantity / product.bunch) * accumulatedWeight;
  });
  return weight * perGramShipping;
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
    if (v?.price)
      total += parseFloat(v.price) * parseInt(v.quantity);
  });
  return {
    cart: cartProducts,
    total: total,
    shipping: pin !== "no" ? getShipping(inCartProducts, pin) : 0,
  };
};