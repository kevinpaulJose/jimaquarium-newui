import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Dimensions } from "react-native";
import { MotiView } from 'moti';
import { AppContext } from "../../App";
import { colorPalete } from "../constants";
import { dummyProducts } from "../Temp/dummy";

import React from "react";
import ProductCard from "../Home/Shared/ProductCard";
import CategorySelector from "../Home/Shared/CategorySelector";

export default function AllProducts() {
    const { page, setPage, cart, categories, selectedCategory, setSelectedCategory, products } = useContext(AppContext);
    const top10 = products;

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}>
                <CategorySelector />
                {selectedCategory !== "" ?
                    <React.Fragment key={`${selectedCategory}--cat`}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.containerText}>{`${selectedCategory}`}</Text>
                        </View>
                        <View style={styles.container}>
                            {top10.filter(t => t.categories === selectedCategory).map((v, i) => (

                                <React.Fragment key={`${v}-${v.id}-${v.name}-${Date().toLowerCase()}featured`}>
                                    <ProductCard product={v} />
                                </React.Fragment>
                            ))}
                        </View>
                    </React.Fragment>
                    :

                    categories.map((category, i) => {
                        if (top10.filter(t => t.categories === category).length > 0)
                            return (
                                <React.Fragment key={`${category}-${i}`}>
                                    <View style={styles.categoryHeader}>
                                        <Text style={styles.containerText}>{`${category}`}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        {top10.filter(t => t.categories === category).map((v, i) => (

                                            <React.Fragment key={`${v}-${i}-featured`}>
                                                <ProductCard product={v} />
                                            </React.Fragment>
                                        ))}
                                    </View>
                                </React.Fragment>
                            )
                    })

                }
                <View style={styles.blankSpace} />
            </ScrollView>



        </>





    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 10,
        flexWrap: "wrap",
        justifyContent: Platform.OS === "web" ? "center" : "space-between",
    },
    categorySelected: {
        backgroundColor: colorPalete.eerie_black,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        marginRight: 10
    },
    categorySelectedText: {
        color: colorPalete.wild_sand
    },
    categoryUnselected: {
        borderColor: colorPalete.silver,
        borderWidth: 2,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        marginRight: 10
    },
    categoryUnSelectedText: {
        color: colorPalete.silver_silk
    },
    containerText: {
        color: colorPalete.silver_silk,
        fontSize: 20,
        fontWeight: "500"
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        // marginTop: 10
    },
    showAll: {
        justifyContent: "flex-end",
        paddingLeft: 7
    },
    showAllText: {
        color: colorPalete.silver
    },
    scrollViewContainer: {
        width: Dimensions.get("window").width - 40,
        alignSelf: "center"
    },
    blankSpace: {
        height: 300,
        width: 10
    }
})