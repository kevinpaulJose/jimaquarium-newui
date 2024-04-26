import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { dummyProducts } from "../Temp/dummy";
import React from "react";
import ProductCartCard from "./Shared/ProductCartCard";
import DashedLine from "./Shared/DashedLine";
import { currency } from "../utils";
import { colorPalete } from "../constants";

export default function Cart() {
    const top5 = dummyProducts.products.slice(0, 10);
    return (
        <>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        top5.map((product, index) => {
                            return (
                                <React.Fragment key={`${product.id}-${product.size}`}>
                                    <ProductCartCard product={product} />
                                    <DashedLine />
                                </React.Fragment>
                            )
                        })
                    }
                </ScrollView>
                

            </View>
          

        </>
    )
}

const styles = StyleSheet.create({

    container: {
        height: Platform.OS !== "web" ? Dimensions.get("window").height / 2 : 260,
        // backgroundColor: "blue"
    },

})