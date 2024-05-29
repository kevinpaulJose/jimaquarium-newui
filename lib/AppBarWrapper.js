import { useContext, useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppContext } from "../App";
import { useQuery, onlineManager } from "@tanstack/react-query"
// import NetInfo from "@react-native-community/netinfo" 
import makeApiRequest from "./api";

export default function AppBarWrapper({ child }) {

    const { setSnackSeverity,
        setOpenSnackbar,
        setOpenSnackbarContent, setProducts, setCategories, setProductLoading } = useContext(AppContext);
    const [settedProducts, setSettedProducts] = useState(false);
    const {isPending, error, data,  } = useQuery({
        queryKey: ['products'],
        queryFn: () => (
          
          makeApiRequest(
            "GET",
            {},
            "/products/all",
            setSnackSeverity,
            setOpenSnackbar,
            setOpenSnackbarContent,
            false,
            setProductLoading
          ).then(res => {
            console.log("Fetched Products");
            // console.log(res);
            if(res?.products) {
              
              return res?.products
            }
            else {
              setProductLoading(false)
              return []
            }
            
          })
          .catch(e => {
            // console.log(e);
            return []
          })
          .finally(() => {
            console.log("Product Loading Completed");
            setProductLoading(false)
          })
        )
      })

    if(isPending) {
        // console.log("Product Loading");
        // setProductLoading(true);
      } if(data) {
        
        if(data?.length > 0) {
            if(!settedProducts) {
                console.log("Data fetched");
                console.log(data?.length);
                setSettedProducts(true)
                let categoriesArray = [];
                const tempCategoriesArray = data.map(
                    (object) => object.categories
                  );
                  categoriesArray = [...new Set(tempCategoriesArray)];
                  setCategories(categoriesArray);
                  setProducts(data);
                  setProductLoading(false)
            }
           
        } else {
          setProductLoading(false)
        }
        
      }
      if(error) {
        setProductLoading(false)
      }

    //   useEffect(() => {
    //     onlineManager.setEventListener((setOnline) => {
    //         return NetInfo.addEventListener((state) => {
    //             setOnline(!!state.isConnected)
    //         })
    //     })
    //   }, [])


    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 90,
            padding: 20,
            marginTop: Platform.OS === "ios" ? 40 : 0
        }
    })
    return (
        <>
                <View style={styles.container}>
                    {child}
                </View>

        </>
    )
}

