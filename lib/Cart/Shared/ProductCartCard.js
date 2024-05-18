import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { MotiView } from 'moti';
import { Icon } from "../../Shared/Icon";
import { colorPalete } from "../../constants";
import { dummyCart, dummyProducts } from "../../Temp/dummy"
import { useContext } from "react";
import { AppContext, addToCartAPI } from "../../../App";
import { currency, navItems, routeTo } from "../../utils";

export default function ProductCartCard({ product, withMargin, quantity }) {
    const { page, setPage, cart, setRouteStack, routeStack,
        setSelectedProduct, setProductCartSaving, productCartSaving, setCart,
        setSnackSeverity, setOpenSnackbar, setOpenSnackbarContent, setAddress, setOrders, setIsUserLoggedIn, setUserDetails
    } = useContext(AppContext);


    const updateCart = (operator, v) => {
        addToCartAPI({
            recalled: false,
            setSaving: setProductCartSaving,
            setCart: setCart,
            setSnackSeverity: setSnackSeverity,
            setOpenSnackbar: setOpenSnackbar,
            cart: cart,
            operator: operator,
            selectedProduct: v,
            setOpenSnackbarContent: setOpenSnackbarContent,
            fromCart: true,
            setAddress: setAddress,
            setOrders: setOrders,
            isPlacedOrder: false,
            reload: false,
            setPage, setRouteStack, routeStack, setIsUserLoggedIn, setUserDetails
        });
    };
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
            <View style={styles.container}>
                <Image style={styles.imgage} source={{ uri: product.img }} />
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.nameText}>{product.name}</Text>
                        <Text style={styles.categoryText}>{product.categories}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{`${currency.INR}${product.price}`}</Text>
                        <View style={styles.iconContainer}>
                            <Pressable action={() => {
                                if (!productCartSaving) {
                                    updateCart("-", product);
                                }
                            }} style={styles.iconParent}>
                                <Icon name={"dash"} size={15} action={() => {
                                    if (!productCartSaving) {
                                        updateCart("-", product);
                                    }
                                }} active={false} badge={0} color={colorPalete.eerie_black} />
                            </Pressable>

                            <Text>{`${quantity}`}</Text>
                            <Pressable action={() => {
                                if (!productCartSaving) {
                                    updateCart("+", product);
                                }
                            }} style={styles.iconParent}>
                                <Icon name={"plus"} size={15} action={() => {
                                    if (!productCartSaving) {
                                        updateCart("+", product);
                                    }
                                }} active={false} badge={0} color={colorPalete.eerie_black} />
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.crossIcon}>
                    <Icon name={"x"} size={24} action={() => { }} active={false} badge={0} color={colorPalete.silver} />

                </View> */}

            </View>

            {/* </MotiView> */}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 50,
        // backgroundColor: "red",
        marginBottom: 15,
        alignSelf: "center",
        flexDirection: "row"
    },
    imgage: {
        width: Platform.OS !== "web" ? Dimensions.get("window").width / 3.3 : 100,
        height: Platform.OS !== "web" ? Dimensions.get("window").width / 3.3 : 100,
        // backgroundColor: "blue",
        resizeMode: "contain",
        borderRadius: 10
    },
    categoryText: {
        textTransform: "uppercase",
        color: colorPalete.silk,
        fontSize: 14
    },
    nameText: {
        fontSize: 22,
        color: colorPalete.silver_silk,
        fontWeight: "800"
    },
    priceText: {
        fontSize: 22,
        color: colorPalete.silver_silk,
        fontWeight: "500"
    },
    textContainer: {
        marginLeft: 20,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "yellow",
        width: Dimensions.get("window").width - 80 - (Platform.OS !== "web" ? Dimensions.get("window").width / 3 : 100)

    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderWidth: 2,
        borderColor: colorPalete.silver,
        margin: 5,
        borderRadius: 100,
        width: 80,
    },
    iconParent: {
        // backgroundColor: "blue",
        padding: 5,
        position: "relative",
        width: 30
    },
    crossIcon: {
        // padding: 10,
        position: "absolute",
        right: 0,
        padding: 5
    }

})