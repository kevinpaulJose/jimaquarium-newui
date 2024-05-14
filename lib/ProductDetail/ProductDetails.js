import { Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "../Shared/Icon";
import { colorPalete } from "../constants";
import { dummyProducts } from "../Temp/dummy";
import { useContext } from "react";
import { AppContext } from "../../App";
import { currency } from "../utils";
import React from "react";

export default function ProductDetails() {
    const { page, setPage, cart, categories, selectedCategory, setSelectedCategory, selectedProduct } = useContext(AppContext);

    return (
        <>
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Image style={styles.image} source={{ uri: selectedProduct.img }} />
                <View style={styles.contentWithoutImage}>
                    <Text style={styles.categoryText}>{selectedProduct.categories}</Text>
                    <Text style={styles.nameText}>{selectedProduct.name}</Text>
                    <Text style={styles.priceText}>{`${currency.INR}${selectedProduct.price}`}</Text>
                    <View style={styles.iconDescModule}>
                        {
                            parseInt(selectedProduct.stock) === 0 ? 
                            <View style={styles.rowDesc}>
                            <Icon name={"repo-deleted"} size={15} action={() => { }} active={false} badge={0} color={colorPalete.danger} />
                            <Text style={{...styles.iconText, color:  colorPalete.danger }}>{`Currently out of stock`}</Text>
                        </View>
                        :
                        <View style={styles.rowDesc}>
                            <Icon name={parseInt(selectedProduct.stock) <= 5 ? "flame" : "container"} size={15} action={() => { }} active={false} badge={0} color={parseInt(selectedProduct.stock) <= 5 ? colorPalete.warning : colorPalete.conifer} />
                            <Text style={{...styles.iconText, color: parseInt(selectedProduct.stock) <= 5 ? colorPalete.warning : colorPalete.conifer}}>{`${parseInt(selectedProduct.stock) > 5 ? "In stock" : "Hurry! only few items left"}`}</Text>
                        </View>
                        }
                        
                        <View style={styles.rowDesc}>
                            <Icon name={"verified"} size={15} action={() => { }} active={false} badge={0} color={colorPalete.silver} />
                            <Text style={styles.iconText}>Secured Delivery</Text>
                        </View>
                        <View style={styles.rowDesc}>
                            <Icon name={"package-dependencies"} size={15} action={() => { }} active={false} badge={0} color={colorPalete.silver} />
                            <Text style={styles.iconText}>Available in nearest store</Text>
                        </View>
                        <Text style={styles.descText}>
                            {selectedProduct.desc}
                        </Text>
                    </View>

                </View>
                <View style={styles.emptySpace} />
                </ScrollView>
              


              
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    scrollContainer: {
        // flexGrow: 1
    },  



    image: {
        width: Platform.OS !== "web" ? Dimensions.get("window").width - 100 : 300,
        height: Platform.OS !== "web" ? Dimensions.get("window").width - 100 : 300,
        resizeMode: "contain",
        alignSelf: "center",
        borderRadius: 10
    },
    rowDesc: {
        flexDirection: "row",
        marginTop: 3
    },
    iconText: {
        fontSize: 15,
        color: colorPalete.silver,
        marginLeft: 5
    },
    iconDescModule: {
        marginTop: 15
    },
    descText: {
        marginTop: 15,
        color: colorPalete.zobra,
        fontSize: 18,
    },
    contentWithoutImage: {
        padding: 20,
        marginTop: -40
    },
    categoryText: {
        textTransform: "uppercase",
        color: colorPalete.silk,
        fontSize: 20,
        marginTop: 30
    },
    nameText: {
        fontSize: 24,
        color: colorPalete.silver_silk,
        fontWeight: "800"
    },
    priceText: {
        fontSize: 24,
        color: colorPalete.silver_silk,
        fontWeight: "500"
    },
    emptySpace: {
        height: 300,
        width: 10,
    }

})