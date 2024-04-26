import { StyleSheet, Text, View } from "react-native";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function ProfileAppBar() {
    const { isUserLoggedIn } = useContext(AppContext);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>
                        {`Account Settings`}
                    </Text>
                </View>
                {isUserLoggedIn && <View style={styles.iconBackground}>
                    <Icon action={() => { }} badge={0} name={"sign-out"} size={20} color={colorPalete.silver_silk} />
                </View>}


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        color: colorPalete.eerie_black,
        fontSize: 22,
        alignSelf: "center"
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    headerContainer: {
        // backgroundColor: "red",
        flex: 1,
        justifyContent: "center",

    },
    iconBackground: {
        backgroundColor: colorPalete.wild_sand,
        padding: 15,
        borderRadius: 100
    }
})