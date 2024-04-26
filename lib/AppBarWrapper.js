import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

export default function AppBarWrapper({ child }) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 90,
            padding: 20,
            // marginTop: Platform.OS !== "web" ? StatusBar.currentHeight : 0
            marginTop: 20
        }
    })
    return (
        <>
        <SafeAreaView>
        <View style={styles.container}>
                    {child}
                </View>
        </SafeAreaView>
               

        </>
    )
}

