import { Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { navItems, routeTo } from "../utils";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import LottieView from 'lottie-react-native';
import ProductCard from "../Home/Shared/ProductCard";
import React from "react";

export default function SearchPage() {
    const {searchText, products } = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if(searchText.length > 2) {
            const filtered = products.filter(entry =>  entry.name.toLowerCase().includes(searchText.toLowerCase()));
            console.log(searchText);
            setSearchResults(filtered)
        } else {
            setSearchResults([])
        }
    }, [searchText])
    return (
        searchText.length > 2 ?
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} automaticallyAdjustKeyboardInsets>
                <View style={styles.container}>
                    {searchResults.map((v, i) => (
                        <React.Fragment key={`${v}-${i}-search`}>
                            <ProductCard product={v} />
                        </React.Fragment>
                    ))}
                    
                </View>
                <View style={styles.blankSpace} />
            </ScrollView> :
            <ScrollView automaticallyAdjustKeyboardInsets>
                <LottieView style={styles.lottieStyle} loop={false} autoPlay source={require('../../assets/login.json')} />
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    lottieStyle: {
        width: 400,
        height: 400,
        // backgroundColor: 'red'
    },
    container: {
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 10,
        flexWrap: "wrap",
        justifyContent: Platform.OS === "web" ? "center" : "space-between",
    },
    scrollView: {
        width: Dimensions.get("window").width- 40,
        alignSelf: "center"
    },
    blankSpace: {
        height: 200,
        width: 10,
        // backgroundColor: "red"
    }


})