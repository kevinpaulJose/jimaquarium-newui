import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "./Shared/Icon";
import { colorPalete } from "./constants";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { MotiView } from 'moti';
import React from "react";
import { currency, navItems, routeTo } from "./utils";




export default function BottomNavigation() {
    const { isUserLoggedIn, page, setPage, cart, routeStack, setRouteStack, selectedAddress } = useContext(AppContext);

    return (
        <>
            {page.page !== "productDetail"
                && page.page !== "checkout"
                && page.page !== "address"
                && page.page !== "orderDetail"
                && page.page !== "searchProducts"
                && page.page !== "allProducts"
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
                page.page === "cart" &&
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
                                {`${currency.INR}200`}
                            </Text>
                            <Text style={styles.subText}>
                                {`Sipping calculated at checkout`}
                            </Text>
                        </View>
                    </View>
                    <Pressable onPress={() => routeTo({ routeStack, newPage: navItems[5], setPage, setRouteStack })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </Pressable>
                </View>
            }
            {
                page.page === "productDetail" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    <View style={styles.itemContainer}>
                        <Icon name={"heart"} size={24} action={() => { }} active={false} badge={0} color={colorPalete.zobra} />

                    </View>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </Pressable>
                </View>
            }
            {
                page.page === "checkout" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    <Pressable style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Place an order</Text>
                    </Pressable>
                </View>
            }

            {
                page.page === "address" &&

                <View style={{ ...styles.container, backgroundColor: "white" }}>
                    <Pressable style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>{selectedAddress !== null ? "Update" : "Add"}</Text>
                    </Pressable>
                </View>
            }
            {
                page.page === "profile" && !isUserLoggedIn &&
                <View style={styles.bottomContainer}>
                   
                    
                    <Pressable onPress={() => routeTo({ routeStack, newPage: navItems[5], setPage, setRouteStack })} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Login / Sign up</Text>
                    </Pressable>
                </View>

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
        width: "70%",
        padding: 15,
        backgroundColor: colorPalete.conifer,
        borderRadius: 15,
    },

    buttonText: {
        color: colorPalete.may_green,
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
    checkoutButtonText: {
        textAlign: "center",
        color: colorPalete.silver,
        fontSize: 20,
        fontWeight: "600"
    },
    bottomContainer: {
        // backgroundColor: "red",
        position: "absolute",
        bottom: 110,
        alignSelf: "center"
    }
})