import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { MotiView } from 'moti';
import { AppContext } from "../../../App";
import { colorPalete } from "../../constants";
import ProductCard from "./ProductCard";
import React from "react";
import { navItems, routeTo } from "../../utils";

export default function SectionWrapper({ products, heading, ifCategoryHide, showAll }) {
    const { setPage,  selectedCategory, routeStack, setRouteStack, setSelectedCategory } = useContext(AppContext);

    const setAndRedirect = ({category}) => {
        setSelectedCategory(category);
        routeTo({routeStack, setPage, setRouteStack, newPage: navItems[9]})
    }
    return (
        <>
                
                    {/* <MotiView
                        from={{
                            opacity: 0,
                            scale: 0,
                            // height: 0
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            // height: 200,
                        }}
                        transition={{
                            type: 'timing',
                        }}
                    > */}
                        <View style={styles.categoryHeader}>
                            <Text style={styles.containerText}>{heading}</Text>
                            {showAll && <Pressable onPress={() => setAndRedirect({category: heading})}>
                                <Text style={styles.editText}>See All</Text>
                            </Pressable>}
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                            {products.map((v, i) => (
                                <React.Fragment key={`${v}-${i}-featured`}>
                                    <ProductCard product={v} withMargin />
                                </React.Fragment>
                            ))}

                        </ScrollView>
                    {/* </MotiView> */}

                
        



        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        marginTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
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
        marginTop: 10
    },
    showAll: {
        justifyContent: "flex-end",
        paddingLeft: 7
    },
    showAllText: {
        color: colorPalete.silver
    },
    editText: {
        fontSize: 16,
        color: colorPalete.silk,
        // backgroundColor: "red"
    },
})