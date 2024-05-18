import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "./Shared/Icon";
import { colorPalete } from "./constants";
import { useContext, useEffect, useState } from "react";
import { AppContext, addToCartAPI, createOrder_upi, login } from "../App";
import { MotiView } from 'moti';
import React from "react";
import { checkUserState, currency, navItems, routePrevious, routeTo, storeData } from "./utils";
import makeApiRequest from "./api";




export default function BottomNavigation() {
    const { userDetails, page, setPage, cart,
        routeStack, setRouteStack, selectedAddress,
        total, setUserDetails, setIsUserLoggedIn,
        selectedProduct, setOpenSnackbar, setOpenSnackbarContent, setProductCartSaving,
        setSnackSeverity, setOrders, setCart, setAddressSaving, setAddress, address,
        name, line1, line2, city, productCartSaving, orders, products, addressSaving,
        pin, phone, userState, consent, setConsent, loggingIn, setLoggingIn, loggingOut, productLoading
    } = useContext(AppContext);
    const [loadingEnabled, setLoadingEnabled] = useState(false);

    const addProductToCart = () => {
        if (!productCartSaving) {
            addToCartAPI(
                {
                    recalled: true,
                    cart: cart,
                    selectedProduct: selectedProduct,
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
                    setPage, setRouteStack, routeStack, setIsUserLoggedIn, setUserDetails
                }
            )
        }

    }
    const updateAddress = async () => {
        if (!addressSaving) {
            setAddressSaving(true);
            const formDataJSON = {
                id: selectedAddress !== null ? selectedAddress?.id : Date.now() + Math.random().toFixed(),
                name: name,
                line1: line1,
                line2: line2,
                city: city,
                state: userState,
                pin: pin,
                phone: phone,
                default: true,
            };
            console.log(selectedAddress);
            let addressList = address;
            let addedAddressIndex = addressList.findIndex((v) => v.id === selectedAddress?.id);
            addressList = addressList.map((v) => {
                return { ...v, default: false };
            });
            if (addedAddressIndex !== -1) {
                addressList[addedAddressIndex] = formDataJSON;
            } else {
                addressList = [formDataJSON, ...addressList];
            }
            let res = await makeApiRequest(
                "POST",
                { userId: userDetails?.email, address: addressList },
                "/address/add",
                setSnackSeverity,
                setOpenSnackbar,
                setOpenSnackbarContent
            );
            if (res?.status === 200) {
                setAddress(addressList);
                routePrevious({ routeStack, setPage, setRouteStack })
            }
            setAddressSaving(false);
        }

    };

    const placeOrder = async () => {
        if (!loadingEnabled) {
            setLoadingEnabled(true);
            await createOrder_upi(
                {
                    userDetails, address, setSnackSeverity, setOpenSnackbar, setOpenSnackbarContent
                    , setCart, selectedProduct, setAddress, setOrders, orders,
                    products, cart, routeStack, setRouteStack, setPage, setIsUserLoggedIn, setUserDetails,
                    productLoading
                }
            );
            setLoadingEnabled(false)
        }

    }
    return (
        <>
            {page.page !== "productDetail"
                && page.page !== "checkout"
                && page.page !== "address"
                && page.page !== "orderDetail"
                && page.page !== "searchProducts"
                && page.page !== "allProducts"
                && page.page !== "paymentProcessing"
                && products.length !== 0 
                && <View style={styles.container}>
                    {navItems.map((v, i) => !v.disabled && (
                        <React.Fragment key={`${v.id}-${i}`}>

                            {page.label === v.label ?
                                <React.Fragment key={`${v.id}-${i}-${v.label}`}>
                                    <MotiView from={{
                                        translateY: -10
                                    }}
                                        animate={{
                                            translateY: 0
                                        }}
                                        transition={{
                                            type: 'spring',
                                        }}>
                                        <Icon name={v.label} size={28} action={() => { routeTo({ routeStack, newPage: v, setPage, setRouteStack }) }} active={page.label === v.label}
                                            badge={v.page !== "cart" ? 0 : cart.length} />
                                    </MotiView>
                                </React.Fragment>
                                :

                                <View key={`${v.id}-${i}-${v.page}`}>
                                    <Icon name={v.label} size={28} action={() => { routeTo({ routeStack, newPage: v, setPage, setRouteStack }) }} active={page.label === v.label}
                                        badge={v.page !== "cart" ? 0 : cart.length} />
                                </View>


                            }



                        </React.Fragment>
                    ))}



                </View>
            }
            {
                page.page === "cart" && cart.length > 0 ?
                    <View style={styles.bottomContainer}>
                        <View style={styles.line} />
                        <View style={styles.checkoutContainer}>
                            <View>
                                <Text style={styles.labelTextTotal}>
                                    Total
                                </Text>
                                {/* <Text style={styles.subText}>
                                {`*inclucive of all taxes`}
                            </Text> */}
                            </View>
                            <View>
                                <Text style={styles.labelTextShipping}>
                                    {`${currency.INR}${total}`}
                                </Text>
                                <Text style={styles.subText}>
                                    {`Sipping calculated at checkout`}
                                </Text>
                            </View>
                        </View>
                        <Pressable onPress={() => !productCartSaving && routeTo({ routeStack, newPage: navItems[5], setPage, setRouteStack })} style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>{productCartSaving ? "Adding...": "Proceed to Checkout"} </Text>
                        </Pressable>
                    </View>
                    :
                    page.page === "cart" &&
                    <View style={styles.bottomContainer}>
                        <Pressable onPress={() => routeTo({ routeStack, newPage: navItems[0], setPage, setRouteStack })} style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>Browse Products</Text>
                        </Pressable>
                    </View>
            }
            {page.page === "orders" && orders.length === 0 &&
                <View style={styles.bottomContainer}>
                    <Pressable onPress={() => routeTo({ routeStack, newPage: navItems[0], setPage, setRouteStack })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Browse Products</Text>
                    </Pressable>
                </View>
            }
            {
                page.page === "productDetail" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    {/* <View style={styles.itemContainer}>
                        <Icon name={"heart"} size={24} action={() => { }} active={false} badge={0} color={colorPalete.zobra} />

                    </View> */}
                    {
                        parseInt(selectedProduct.stock) === 0 ?

                            <Pressable style={styles.buttonDisabled}>
                                <Text style={styles.buttonTextDisabled}>Out of Stock</Text>
                            </Pressable>
                            :
                            <Pressable onPress={addProductToCart} style={styles.button}>
                                <Text style={styles.buttonText}>{productCartSaving ? "Adding..." : "Add to Cart"}</Text>
                            </Pressable>
                    }

                </View>
            }
            {
                page.page === "checkout" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    <Pressable onPress={placeOrder} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{loadingEnabled ? `Placing order...` : `Place an order`}</Text>
                    </Pressable>
                </View>
            }

            {
                page.page === "address" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    <Pressable onPress={updateAddress} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{selectedAddress !== null ? (!addressSaving ? "Update" : "Updating...") : (!addressSaving ? "Add" : "Adding")}</Text>
                    </Pressable>
                </View>
            }
            {
                (page.page === "profile" && !userDetails.name) &&
                <View style={styles.bottomContainer}>


                    <Pressable onPress={() => login({ loggingIn, setLoggingIn })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{loggingIn ? "Please wait..." : "Login / Sign up"}</Text>
                    </Pressable>
                </View>

            }
            {
                (page.page === "cart" && !userDetails.name) &&
                <View style={styles.bottomContainer}>


                    <Pressable onPress={() => login({ loggingIn,setLoggingIn })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{loggingIn ? "Please wait..." : "Login / Sign up"}</Text>
                    </Pressable>
                </View>

            }
            {
                (page.page === "orders" && !userDetails.name) &&
                <View style={styles.bottomContainer}>


                    <Pressable onPress={() => login({ loggingIn,setLoggingIn })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{loggingIn ? "Please wait..." : "Login / Sign up"}</Text>
                    </Pressable>
                </View>

            }
            {
                products.length === 0 &&

                <View style={styles.bottomContainer}>


                <Pressable style={{...styles.checkoutButton, backgroundColor: "white", height: 60}}>
                    <Text numberOfLines={2} style={styles.checkoutButtonText}>{ "Setting up the Application.."}</Text>
                    {products.length === 0 && !productLoading &&  <Text numberOfLines={2} style={{...styles.checkoutButtonText, fontWeight: "400", fontSize: 12, marginTop: 10}}>
                        Please restart the app if it takes too long</Text>}
                </Pressable>
            </View>
            }
            {
                consent.visible &&
                <MotiView
                    from={{
                        translateY: 300
                    }}
                    animate={{
                        translateY: 0
                    }}
                    transition={{
                        type: 'timing',
                    }}
                    style={{ ...styles.bottomContainer, ...styles.consentParent }}
                >
                    <View >
                        <View style={styles.consentLabel}>
                            <Text style={styles.consentText}>
                                {consent.label}
                            </Text>
                        </View>

                        <View style={styles.consentButtonParent}>
                            <Pressable onPress={() => setConsent({
                                label: "",
                                action: () => { },
                                visible: false
                            })} style={styles.censentButtonInactive}>
                                <Text style={{ ...styles.checkoutButtonText, color: colorPalete.eerie_black }}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={consent.action} style={styles.censentButton}>
                                <Text style={styles.checkoutButtonText}>{loggingOut ? "..." : "Proceed"}</Text>
                            </Pressable>
                        </View>

                    </View>
                </MotiView>

            }

            {
                !consent.visible && consent.label === "" &&
                <MotiView
                    from={{
                        translateY: 0
                    }}
                    animate={{
                        translateY: 300
                    }}
                    transition={{
                        type: 'timing',
                    }}
                    style={{ ...styles.bottomContainer, ...styles.consentParent }}
                >
                    <View >
                        <View style={styles.consentLabel}>
                            <Text style={styles.consentText}>
                                {consent.label}
                            </Text>
                        </View>

                        <View style={styles.consentButtonParent}>
                            <Pressable onPress={() => setConsent({
                                label: "",
                                action: () => { },
                                visible: false
                            })} style={styles.censentButtonInactive}>
                                <Text style={{ ...styles.checkoutButtonText, color: colorPalete.eerie_black }}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={consent.action} style={styles.censentButton}>
                                <Text style={styles.checkoutButtonText}>Proceed</Text>
                            </Pressable>
                        </View>

                    </View>
                </MotiView>

            }

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        backgroundColor: colorPalete.wild_sand,
        width: "100%",
        height: 90,
        position: Platform.OS !== "web" ? "absolute" : "fixed",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    itemContainer: {
        borderColor: colorPalete.silver,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15
    },
    button: {
        width: "90%",
        padding: 15,
        backgroundColor: colorPalete.conifer,
        borderRadius: 15,
    },
    buttonDisabled: {
        width: "90%",
        padding: 15,
        backgroundColor: colorPalete.silver_silk,
        borderRadius: 15,
    },

    buttonText: {
        color: colorPalete.may_green,
        fontSize: 22,
        fontWeight: "800",
        textAlign: "center"
    },

    buttonTextDisabled: {
        color: colorPalete.wild_sand,
        fontSize: 22,
        fontWeight: "800",
        textAlign: "center"
    },
    checkoutContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // padding: 10,
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center"
    },
    labelTextShipping: {
        fontSize: 26,
        fontWeight: "700",
        color: colorPalete.eerie_black,
        // backgroundColor: "red",
        textAlign: "right"
    },
    subText: {
        fontSize: 14,
        color: colorPalete.silk
    },
    labelTextTotal: {
        fontSize: 26,
        fontWeight: "700",
        color: colorPalete.eerie_black,
        // backgroundColor: "red",
        textAlign: "left"
    },
    line: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 1,
        marginBottom: 10,
        borderColor: colorPalete.silver,
        width: "100%",
        alignSelf: "center"
    },
    checkoutButton: {
        backgroundColor: colorPalete.eerie_black,
        width: Dimensions.get("window").width - 40,
        borderRadius: 15,
        alignSelf: "center",
        height: 50,
        justifyContent: "center",
        marginTop: 15
    },
    censentButton: {
        backgroundColor: colorPalete.eerie_black,
        // width: Dimensions.get("window").width - 40,
        borderRadius: 15,
        alignSelf: "center",
        height: 50,
        justifyContent: "center",
        flex: 1,
        margin: 5
        // marginTop: 15
    },
    censentButtonInactive: {
        backgroundColor: colorPalete.silver,
        // width: Dimensions.get("window").width - 40,
        borderRadius: 15,
        alignSelf: "center",
        height: 50,
        justifyContent: "center",
        flex: 1,
        margin: 5
        // marginTop: 15
    },
    consentParent: {
        width: Dimensions.get("window").width - 40,
        backgroundColor: colorPalete.wild_sand,
        alignSelf: "center",
        padding: 10,
        borderRadius: 10
    },
    consentButtonParent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    checkoutButtonText: {
        textAlign: "center",
        color: colorPalete.silk,
        fontSize: 20,
        fontWeight: "600"
    },

    bottomContainer: {
        // backgroundColor: "red",
        position: "absolute",
        bottom: 110,
        alignSelf: "center"
    },
    consentLabel: {
        padding: 10
    },
    consentText: {
        fontSize: 20,
        color: colorPalete.eerie_black
    }
})