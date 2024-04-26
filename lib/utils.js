import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';

export const storeData = async ({ value, key }) => {
  try {
    await AsyncStorage.setItem(key ? key : "nokey", value);
  } catch (e) {
    // saving error
  }
};

export const retrieveData = async ({ key }) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (e) {
    // saving error
  }
};

export const routeTo = ({ routeStack, newPage, setPage, setRouteStack }) => {
  setPage(newPage);
  let currentStackBuffer = routeStack;
  if(newPage.page !== currentStackBuffer[currentStackBuffer.length - 1].page) {
    currentStackBuffer.push(newPage);
  }
  
  setRouteStack(currentStackBuffer);

}
export const routePrevious = ({ routeStack, setPage, setRouteStack }) => {
  if (routeStack.length === 1) {
    BackHandler.exitApp();
  } else {
    let currentStackBuffer = routeStack;
    currentStackBuffer.pop();
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

];

export const currency = {
  "INR": "₹"
}