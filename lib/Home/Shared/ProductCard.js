import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { MotiView } from 'moti';
import { Icon } from "../../Shared/Icon";
import { colorPalete } from "../../constants";
import { dummyCart, dummyProducts } from "../../Temp/dummy"
import { useContext, useEffect, useState } from "react";
import { AppContext, addToCartAPI } from "../../../App";
import { currency, navItems, routeTo } from "../../utils";

export default function ProductCard({ product, withMargin }) {
    const { page, setPage, cart, setRouteStack, routeStack, setSelectedProduct
        , productCartSaving, setCart, setIsUserLoggedIn, setOpenSnackbar, setOpenSnackbarContent,
        setProductCartSaving, setSnackSeverity, setUserDetails, setOrders,

    } = useContext(AppContext);
    const [hasInCart, setHasInCart] = useState(false)

    useEffect(() => {
        let hasInCartPointer = false
        cart.map(c => {
            if (c.productId === product.productId) {
                hasInCartPointer = true
                console.log(c.productId);
            }
        });
        if (hasInCartPointer) {
            setHasInCart(true)
        } else {
            setHasInCart(false)
        }
    }, [])

    const addToCartAndRedirect = () => {
        setSelectedProduct(product);
        routeTo({ routeStack, newPage: navItems[4], setPage, setRouteStack });
        if (!productCartSaving) {
            addToCartAPI(
                {
                    recalled: true,
                    cart: cart,
                    selectedProduct: product,
                    setCart: setCart,
                    setIsUserLoggedIn: setIsUserLoggedIn,
                    setOpenSnackbar: setOpenSnackbar,
                    setOpenSnackbarContent: setOpenSnackbarContent,
                    setSaving: setProductCartSaving,
                    setSnackSeverity: setSnackSeverity,
                    setUserDetails: setUserDetails,
                    fromCart: false,
                    operator: "+",
                    setOrders: setOrders,
                    setPage, setRouteStack, routeStack, setIsUserLoggedIn, setUserDetails,
                    
                }
            )
        }
    }


    return (
        <>
            <MotiView
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
            >
                <Pressable onPress={() => {
                    setSelectedProduct(product);
                    routeTo({ routeStack, newPage: navItems[4], setPage, setRouteStack })
                }} style={{ ...styles.container, marginRight: withMargin ? 15 : Platform.OS === "web" ? 12 : 0 }}>
                    <View style={styles.iconRow}>
                        {parseInt(product.stock) <= 10 && parseInt(product.stock) != 0 ?
                            <Text style={styles.badgeText}>{`Fast moving`}</Text> :
                            parseInt(product.stock) === 0 ?
                                <Text style={styles.badgeText}>{`Out of Stock`}</Text> : <Text></Text>
                        }
                        {/* {hasInCart.length > 0 ?
                            <Icon action={() => { }} badge={0} name={"heart"} size={22} color={colorPalete.silver_silk} />
                            :
                            <Icon action={() => { }} badge={0} name={"heart-fill"} size={22} color={colorPalete.lima} />
                        } */}

                    </View>
                    <Image style={styles.image} source={{ uri: product.img }} />
                    <Text style={styles.categoryText}>{product.categories}</Text>
                    <Text style={styles.nameText}>{product.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{`${currency.INR}${product.price}`}</Text>
                        {parseInt(product.stock) !== 0 &&
                            <View style={styles.addIcon}>
                                <Icon action={addToCartAndRedirect} badge={0} name={"plus"} size={18} color={colorPalete.wild_sand} />
                            </View>
                        }



                    </View>
                </Pressable>
            </MotiView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colorPalete.silver,
        borderWidth: 0.3,
        borderRadius: 10,
        padding: 15,
        // marginRight: 15,
        marginBottom: 10,
        width: Platform.OS !== "web" ? Dimensions.get("window").width / 2.3 : 175,
        flex: 1,
    },
    iconRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    badgeText: {
        backgroundColor: colorPalete.eerie_black,
        color: colorPalete.wild_sand,
        paddingTop: 5,
        borderRadius: 100,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        justifyContent: "center"
    },
    image: {
        width: Platform.OS !== "web" ? (Dimensions.get("window").width / 2.3) - 40 : 120,
        height: Platform.OS !== "web" ? (Dimensions.get("window").width / 2.3) - 40 : 120,
        // marginTop: 20,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10
    },
    categoryText: {
        fontSize: 16,
        color: colorPalete.silver,
        marginTop: 5
    },
    nameText: {
        fontSize: 18,
        color: colorPalete.eerie_black
    },
    priceContainer: {
        backgroundColor: colorPalete.wild_sand,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 100,
        marginTop: 10,
    },
    addIcon: {
        backgroundColor: colorPalete.eerie_black,
        paddingTop: 5,
        borderRadius: 100,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8
    },
    priceText: {
        fontSize: 18,
        color: colorPalete.silver_silk,
        paddingLeft: 5,
        paddingTop: 2
    }
})