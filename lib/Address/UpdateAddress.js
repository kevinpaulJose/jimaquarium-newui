import { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { AppContext } from "../../App";
import { colorPalete } from "../constants";
import makeApiRequest from "../api";
import { routePrevious } from "../utils";

export default function UpdateAddress() {
    const { selectedAddress, name, setName, line1, setLine1, line2, setLine2, city, setCity, userState, setUserState,
        pin, setPin, phone, setPhone
    } = useContext(AppContext);
    



    return (
        <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
            <TextInput maxLength={20} autoComplete="name" style={styles.inputContainer} value={name} onChangeText={(text) => setName(text)} placeholder="Name" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={30} autoComplete="address-line1" style={styles.inputContainer} value={line1} onChangeText={(text) => setLine1(text)} placeholder="Door.No / Appt. Name" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={30} autoComplete="address-line2" style={styles.inputContainer} value={line2} onChangeText={(text) => setLine2(text)} placeholder="Street Name" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={20} style={styles.inputContainer} value={city} onChangeText={(text) => setCity(text)} placeholder="City" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={20} style={styles.inputContainer} value={userState} onChangeText={(text) => setUserState(text)} placeholder="State" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={10} keyboardType="number-pad" autoComplete="tel" style={styles.inputContainer} value={phone} onChangeText={(text) => setPhone(text)} placeholder="Phone" placeholderTextColor={colorPalete.silver} />
            <TextInput maxLength={6} keyboardType="number-pad" autoComplete="postal-code" style={styles.inputContainer} value={pin} onChangeText={(text) => setPin(text)} placeholder="PIN Code" placeholderTextColor={colorPalete.silver} />
            <View style={styles.blankSpace} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        padding: 15,
        marginTop: 12,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colorPalete.silver,
        color: colorPalete.silver_silk
    },
    container: {
        // backgroundColor: "yellow",
        height: Dimensions.get("window").height - 90
    },
    blankSpace: {
        height: 500,
        width: 20
    }
})