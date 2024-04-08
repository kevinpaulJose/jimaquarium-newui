import { StyleSheet, Text, View } from "react-native";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";

export default function CartAppBar() {
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcomeText}>
                        {`Welcome back,`}
                    </Text>
                    <Text style={styles.nameText}>
                        {`Olivia`}
                    </Text>
                </View>
                <View style={styles.iconBackground}>
                    <Icon action={() => {}} badge={0} name={"search"} size={26} color={colorPalete.silver_silk} />
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        color: colorPalete.eerie_black,
        fontSize: 16,
        fontWeight: "600"
    },
    nameText: {
        color: colorPalete.eerie_black,
        fontSize: 22,
        fontWeight: "700"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    iconBackground: {
        backgroundColor: colorPalete.wild_sand,
        padding: 15,
        borderRadius: 100
    }
})