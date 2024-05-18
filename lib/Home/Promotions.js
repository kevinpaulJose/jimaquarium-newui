import React, { useContext } from "react";
import { dummyProducts, dummyPromotion } from "../Temp/dummy";
import PromotionCard from "./Shared/PromotionCard";
import { ScrollView, StyleSheet } from "react-native";
import { colorPalete } from "../constants";
import { AppContext } from "../../App";
export default function Promotions() {
    const {searchText, products } = useContext(AppContext);
    const gradients = [
        {palete: [colorPalete.lima, colorPalete.conifer , colorPalete.lima], primary: colorPalete.may_green},
        {palete: [colorPalete.silver_silk, colorPalete.silk , colorPalete.zobra], primary: colorPalete.eerie_black}
    ]
    // const promotions = dummyPromotion.promotion.map((promotion) => {
    //     const currentProduct = dummyProducts.products.filter(p => p.id === promotion.productId)[0];
       
    //     return {
    //         name: currentProduct.name,
    //         title: promotion.title,
    //         desc: currentProduct.desc,
    //         img: dummyProducts.products[0].img,
    //         id: promotion.id
    //     }
    // })
    const promotions = products.filter(product => product.box === "yes")
    return(
        <>
        <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
        {
                promotions.map((promotion, i) => (
                    <React.Fragment key={`${promotion.productId}-${promotion.name}`}>
                        <PromotionCard promotion={promotion} gradient={gradients[parseInt(i) % 2].palete} primary={gradients[parseInt(i) % 2].primary} />
                    </React.Fragment>
                ))
            }
        </ScrollView>
           
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // marginRight: 20
    }
})