import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { dummyProducts } from "../Temp/dummy";
import React, { useContext, useEffect } from "react";
import ProductCartCard from "./Shared/ProductCartCard";
import DashedLine from "./Shared/DashedLine";
import { currency, getProductsAndTotal, retrieveData } from "../utils";
import { colorPalete } from "../constants";
import { AppContext, addToCartAPI } from "../../App";
import NotLoggedInComponent from "../Shared/NotLoggedInComponent";
import LottieView from "lottie-react-native";

export default function Cart() {
    const top5 = dummyProducts.products.slice(0, 10);
    const { page, setPage, cart, categories, selectedCategory, setSelectedCategory, userDetails, selectedProduct,
        products, setTotal } = useContext(AppContext);
    // const currectUser = retrieveData({ key: "user" })
    useEffect(() => {

        setTotal(getProductsAndTotal(cart, products, "no").total);
    }, [cart]);


    return (
        <>
            {
                userDetails.name ?
                    <View style={{...styles.container, 

                        height: cart.length === 0 ?  ( Dimensions.get("window").height -300)
                        : ( Platform.OS !== "web" ? Dimensions.get("window").height / 2 : 400) 
                    }}>
                        {cart.length === 0 ?
                            <ScrollView automaticallyAdjustKeyboardInsets>
                                {/* <View style={styles.lottie} > */}
                                <LottieView loop={false} autoPlay source={require('../../assets/emptyCart.json')} />

                                {/* </View> */}
                                
                            </ScrollView>
                            :
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    cart.map((item, index) => {

                                        let product = products.filter((p) => p.productId === item.productId)[0];
                                        if (product) {
                                            return (
                                                <React.Fragment key={`${product.id}-${index}`}>
                                                    <ProductCartCard product={product} quantity={item.quantity} />
                                                    <DashedLine />
                                                </React.Fragment>
                                            )
                                        }

                                    })
                                }
                            </ScrollView>
                        }



                    </View>
                    :
                    <NotLoggedInComponent />
            }



        </>
    )
}

const styles = StyleSheet.create({

    container: {
        // height: Platform.OS !== "web" ? Dimensions.get("window").height / 2 : 260,
        // backgroundColor: "blue"
    },
    lottie: {
        // backgroundColor: "red",
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 40,
    }

})