import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { dummyAddress, dummyOrders, dummyProducts } from "../Temp/dummy";
import { colorPalete } from "../constants";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { Icon } from "../Shared/Icon";
import { currency } from "../utils";

export default function OrderDetail() {
    const { selectedOrder } = useContext(AppContext);

    const getCurrentStatus = () => {
        switch (selectedOrder.status) {
            case "Order Recieved":
                return [
                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Processing", status: "ongoing", icon: "dot-fill", bgColor: "white", color: colorPalete.lima },
                    { label: "Packed", status: "notenabled", icon: "dot-fill", bgColor: colorPalete.silver, color: colorPalete.silver },
                    { label: "Shipped", status: "notenabled", icon: "dot-fill", bgColor: colorPalete.silver, color: colorPalete.silver },
                ]
            case "Processing":
                return [
                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Processing", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Packed", status: "ongoing", icon: "dot-fill", bgColor: "white", color: colorPalete.lima },
                    { label: "Shipped", status: "notenabled", icon: "dot-fill", bgColor: colorPalete.silver, color: colorPalete.silver },
                ]
            case "Packed":
                return [

                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Processing", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Packed", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Shipped", status: "ongoing", icon: "dot-fill", bgColor: "white", color: colorPalete.lima },

                ]
            case "Shipped":
                return [

                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Processing", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Packed", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Shipped", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },

                ]
            case "Payment Failed":
                return [
                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: selectedOrder.status, status: "failed", icon: "x", bgColor: colorPalete.danger, color: "white" },
                ]
            case "Cancelled":
                return [
                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: selectedOrder.status, status: "failed", icon: "x", bgColor: colorPalete.danger, color: "white" },
                ]
            default:
                return [
                    { label: "Ordered", status: "enabled", icon: "check", bgColor: colorPalete.lima, color: "white" },
                    { label: "Processing", status: "ongoing", icon: "dot-fill", bgColor: "white", color: colorPalete.lima },
                    { label: "Packed", status: "notenabled", icon: "dot-fill", bgColor: colorPalete.silver, color: colorPalete.silver },
                    { label: "Shipped", status: "notenabled", icon: "dot-fill", bgColor: colorPalete.silver, color: colorPalete.silver },
                ]
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Text style={styles.orderHeadingText}>
                    {`Order #${selectedOrder.id}`}
                </Text>
                {(selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Payment Failed") &&
                    <Pressable style={styles.invoiceContainer}>
                        <Text style={styles.invoiceText}>
                            View invoice
                        </Text>
                    </Pressable>}

            </View>
            <View style={styles.statusContainer}>
                {/* <View style={styles.line} /> */}
                {
                    getCurrentStatus().map((status, index) => (
                        <View style={styles.separateStatusContainer} key={`${index}-${status.label}`}>
                            {(status.status !== "failed" && index !== 3) && <View style={{ ...styles.line, backgroundColor: status.status !== "notenabled" ? colorPalete.lima : colorPalete.silver }} />}
                            <View style={{ ...styles.iconContainer, backgroundColor: status.bgColor, borderColor: status.status === "ongoing" ? colorPalete.lima : "transparent" }}>
                                <Icon name={status.icon} color={status.color} size={20} action={() => { }} />
                            </View>
                            <View style={styles.statusRightContainer}>
                                <Text style={{ ...styles.statusText, color: status.status === "notenabled" ? colorPalete.silk : colorPalete.silver_silk }}>{status.label}</Text>
                                {status.status === "ongoing" && <Text style={styles.statusDesc}>{`In progress..`}</Text>}
                            </View>
                        </View>
                    ))
                }

            </View>
            <View >
                <Text style={styles.subHeader}>Payment summary</Text>
                <View style={styles.billingContainer}>
                    <Text style={styles.subSubHeading}>Bills to:</Text>
                    <Text style={styles.subText}>{`${dummyAddress.address[0].name}`}</Text>
                    <Text style={styles.subText}>{`${dummyAddress.address[0].line1}, ${dummyAddress.address[0].line2}`}</Text>
                    <Text style={styles.subText}>{`${dummyAddress.address[0].city}, ${dummyAddress.address[0].state} - ${dummyAddress.address[0].pin}`}</Text>
                </View>
                <Text style={{ ...styles.subHeader, marginTop: 10 }}>Ordered products</Text>
                {selectedOrder.products.map((product, index) => (
                    <View key={`${product.id}-${index}`} style={styles.productsContainer}>
                        <View>
                            <Image style={styles.image} source={{ uri: dummyProducts.products[0].img }} />
                        </View>
                        <View style={styles.middleImageContainer}>
                            <Text style={styles.subSubHeading}>{dummyProducts.products[0].name}</Text>
                            <Text style={styles.subText}>{`2 item`}</Text>
                        </View>
                        <View style={styles.rightImageContainer}>
                            <Text style={{ ...styles.subText, fontSize: 20 }}>{`${currency.INR}${dummyProducts.products[0].price}`}</Text>
                        </View>

                    </View>
                ))}
                 

            </View>

                <View style={styles.blankSpace} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        // height: "100%"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    invoiceContainer: {
        padding: 13,
        backgroundColor: colorPalete.wild_sand,
        borderRadius: 10
    },
    invoiceText: {
        color: colorPalete.silver,
        fontSize: 16
    },
    statusText: {
        color: colorPalete.silver_silk,
        fontSize: 20
    },
    statusContainer: {
        // backgroundColor: "red",
        marginTop: 10
    },
    separateStatusContainer: {
        flexDirection: "row",
        marginBottom: 25,
        // backgroundColor: "violet"
    },
    iconContainer: {
        // backgroundColor: "orange",
        // padding: 5,
        borderRadius: 100,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
    statusRightContainer: {
        // backgroundColor: "yellow",
        marginLeft: 15
    },
    orderHeadingText: {
        fontSize: 20,
        fontWeight: "600",
        color: colorPalete.silver_silk,
        // backgroundColor: "red",
        textAlignVertical: "center"
    },
    line: {
        height: 70,
        width: 4,
        position: "absolute",
        left: 13
    },
    statusDesc: {
        fontSize: 13,
        color: colorPalete.silver,
        position: "absolute",
        top: 25
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "500",
        color: colorPalete.eerie_black,
    },
    billingContainer: {
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        backgroundColor: colorPalete.silver,
        borderRadius: 13,
        padding: 20,
        marginTop: 10
    },
    subSubHeading: {
        fontSize: 17,
        fontWeight: "500",
        color: colorPalete.eerie_black
    },
    subText: {
        fontSize: 17,
        // fontWeight: "500",
        color: colorPalete.silver_silk
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: "contain"
    },
    productsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    middleImageContainer: {
        // backgroundColor: "red",
        flex: 1,
        paddingLeft: 15,
        justifyContent: "center"
    },
    rightImageContainer: {
        width: 70,
        // backgroundColor: "red",
        justifyContent: "center",
        marginTop: -20,
        // flex: 1
    },
    blankSpace: {
        height: 200,
        width: 10
    }


})

