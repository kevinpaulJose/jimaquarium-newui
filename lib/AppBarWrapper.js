import { StyleSheet, View } from "react-native";

export default function AppBarWrapper({child}) {
    return(
        <>
            <View style={styles.container}>
                {child}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 90,
        padding: 20
    }
})