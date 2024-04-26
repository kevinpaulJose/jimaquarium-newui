import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { colorPalete } from "../constants"
import { useState } from "react"
import React from "react"
import { currency } from "../utils"

export default function ShippingMethod() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Shipping Method
                </Text>

            </View>

            <View style={styles.addressCardContainer}>
                <View>
                    <View style={{ ...styles.dot, borderColor: colorPalete.conifer }} />

                </View>
                <View style={styles.mainAddressContainer}>
                    <Text style={styles.nameText}>
                        {`ST / DHL (+${currency.INR}200)`}
                    </Text>
                    <Text style={styles.addressText}>
                        {`Estimated delivery time: ${new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(Date.now() + 86400000 * 2))}`}
                    </Text>

                </View>

            </View>
            <Text style={{...styles.addressText, paddingLeft: 20, paddingRight: 20}}>
                {`The shipping charges inclues secure packaging and oxygen for fish to witstand the projected delivery timings`}
            </Text>





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
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 10,
        paddingBottom: 10,
        width: Dimensions.get("window").width - 40,
        // borderWidth: 2,
        // borderColor: colorPalete.wild_sand,
        borderRadius: 20,
        justifyContent: "space-around",
        alignSelf: "center",
        marginTop: 7
    },
    mainAddressContainer: {
        // flexDirection: "column",
        // backgroundColor: "red",
        flex: 1,
        paddingLeft: 15

    },
    nameText: {
        color: colorPalete.eerie_black,
        fontSize: 17,
    },
    addressText: {
        color: colorPalete.silk,
        fontSize: 16
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
})