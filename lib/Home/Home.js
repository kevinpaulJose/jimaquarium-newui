import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../App";
import { retrieveData, routeTo, storeData } from "../utils";
import CategorySelector from "./Shared/CategorySelector";
import Promotions from "./Promotions";
import { dummyProducts } from "../Temp/dummy";
import SectionWrapper from "./Shared/SectionWrapper";
import React from "react";
import { useQuery } from "@tanstack/react-query"

export default function Home() {
    const {  categories, selectedCategory, products, } = useContext(AppContext);





    const top10 = products;
    const hotArrivals = {
        heading: "Hot arrivals",
        products: top10.slice(0, 4)
    }
    const categoriesWithProduct = categories.map((category, _) => {
        return (
            {
                heading: category,
                products: products.filter(product => product.categories === category).slice(0, 4)
            }
        )
    })
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Promotions />
            <CategorySelector />
            <SectionWrapper heading={hotArrivals.heading} products={hotArrivals.products} ifCategoryHide />
            {selectedCategory === "" ?
                categoriesWithProduct.map((cat, i) => (
                    cat.products.length > 0 &&
                    <React.Fragment key={`${cat.heading}-${i}`}>
                        <SectionWrapper heading={cat.heading} products={cat.products} showAll />
                    </React.Fragment>
                ))
                :
                categoriesWithProduct.map((cat, i) => (
                    cat.products.length > 0 && cat.heading === selectedCategory &&
                    <React.Fragment key={`${cat.heading}-${i}`}>
                        <SectionWrapper heading={cat.heading} products={cat.products} showAll />
                    </React.Fragment>
                ))
            }

            {/* <NewArrival /> */}
            {/* <AllProducts /> */}
            <View style={styles.emptySpace} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // paddingBottom: 1200
    },
    emptySpace: {
        height: 300,
        width: 10,
    }
})