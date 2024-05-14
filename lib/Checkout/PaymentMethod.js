import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { colorPalete } from "../constants"
import { Icon } from "../Shared/Icon"
import { dummyAddress } from "../Temp/dummy"
import { useState } from "react"
import { MotiView } from 'moti';
import DashedLine from "../Cart/Shared/DashedLine"
import React from "react"
import { currency } from "../utils"

export default function PaymentMethod() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
    const updatePaymentMethod = ({ method }) => {
        setSelectedPaymentMethod(method)

    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Payment Method
                </Text>
                {/* <Pressable>
                    <Text style={styles.editText}>Add</Text>
                </Pressable> */}
            </View>

            <Pressable onPress={() => updatePaymentMethod({ method: 'visa' })} style={{ ...styles.addressCardContainer, borderColor: selectedPaymentMethod === "visa" ? colorPalete.conifer : colorPalete.wild_sand, marginTop: 15 }}>
                <View style={styles.leftIcon}>
                    <Icon name={"credit-card"} size={23} action={() => { }} active={false} badge={0} color={colorPalete.silver_silk} />
                </View>
                <View style={styles.mainAddressContainer}>
                    <Text style={styles.nameText}>
                        {`UPI / Card \n`}
                        <Text style={styles.addressText}>
                            {`UPI, Visa, Master credit and debit cards`}
                        </Text>
                    </Text>

                </View>
                <View style={styles.dotContainer}>
                    <View style={{ ...styles.dot, borderColor: selectedPaymentMethod === "visa" ? colorPalete.conifer : colorPalete.wild_sand, backgroundColor: selectedPaymentMethod === "visa" ? "transparent" : colorPalete.wild_sand }} />
                </View>


            </Pressable>

            <Pressable onPress={() => updatePaymentMethod({ method: 'cash' })} style={{ ...styles.addressCardContainer, borderColor: selectedPaymentMethod === "cash" ? colorPalete.conifer : colorPalete.wild_sand }}>
                <View style={styles.leftIcon}>
                    <Text style={styles.leftIconText}>{`${currency.INR}`}</Text>
                </View>
                <View style={styles.mainAddressContainer}>
                    <Text style={styles.nameText}>
                        {`Pay Later \n`}
                        <Text style={styles.addressText}>
                            {`Pay upon order confirmation`}
                        </Text>
                    </Text>

                </View>
                <View style={styles.dotContainer}>
                    <View style={{ ...styles.dot, borderColor: selectedPaymentMethod === "cash" ? colorPalete.conifer : colorPalete.wild_sand, backgroundColor: selectedPaymentMethod === "cash" ? "transparent" : colorPalete.wild_sand }} />
                </View>


            </Pressable>

       





        </>

    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 20
    },
    titleText: {
        fontSize: 20,
        color: colorPalete.eerie_black,
        // fontWeight: "600"
    },
    editText: {
        fontSize: 16,
        color: colorPalete.silk,
    },
    addressCardContainer: {
        flexDirection: "row",
        // backgroundColor: "red",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get("window").width - 40,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 7
    },
    mainAddressContainer: {
        // flexDirection: "column",
        // backgroundColor: "red",
        flex: 1,
        justifyContent: "center"

    },
    nameText: {
        color: colorPalete.eerie_black,
        fontSize: 18,
        paddingLeft: 20,

    },
    addressText: {
        color: colorPalete.silk,
        fontSize: 12
    },
    innerContainer: {
        flexDirection: "column"
    },
    iconAlign: {
        paddingTop: 16
    },
    dot: {
        width: 22,
        height: 22,
        borderWidth: 6,
        borderColor: colorPalete.conifer,
        borderRadius: 100
        //  backgroundColor: "red"
    },
    dotContainer: {
        justifyContent: "center"
    },
    leftIcon: {
        backgroundColor: colorPalete.wild_sand,
        width: 70,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        height: 50,
        justifyContent: "center"
    },
    leftIconText: {
        fontSize: 22,
        color: colorPalete.silver_silk
    }
})