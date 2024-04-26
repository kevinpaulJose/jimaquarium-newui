import { StyleSheet, View } from "react-native";
import { colorPalete } from "../../constants";

export default function DashedLine() {
    return(
        <View style={styles.container} />
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: "dashed",
        borderWidth: .3,
        borderRadius: 1,
        marginBottom: 15,
        borderColor: colorPalete.silver,
        width: "90%",
        alignSelf: "center"
    }
})