import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";

export default function Checkout() {
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ShippingAddress />
                <PaymentMethod />
                <ShippingMethod />
                <View style={styles.blankSpace} />
            </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    blankSpace: {
        height: 250,
        width: 100
    }
})

