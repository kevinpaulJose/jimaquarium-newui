import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async ({value, key}) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  export const retrieveData = async ({ key}) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (e) {
      // saving error
    }
  };

  export const routeTo = ({routeStack, newPage, setPage, setRouteStack}) => {
    let currentStackBuffer = routeStack;
    currentStackBuffer.push(newPage);
    setRouteStack(currentStackBuffer);
    setPage(newPage);
  }  
  export const routePrevious = ({routeStack, setPage}) => {
    let currentStackBuffer = routeStack;
    currentStackBuffer.pop();
    setPage(currentStackBuffer[currentStackBuffer.length - 1]);
  }