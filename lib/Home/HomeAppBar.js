import { StyleSheet, Text, View } from "react-native";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { navItems, retrieveData, routeTo } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function HomeAppBar() {
    const { routeStack, setPage, setRouteStack, isUserLoggedIn, userDetails } = useContext(AppContext);
    // const currectUser = retrieveData({ key: "user" })
    // console.log(userDetails);
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcomeText}>
                        {`Welcome back,`}
                    </Text>
                    {userDetails.name ? <Text style={styles.nameText}>
                        {`${userDetails?.name}`}
                    </Text>
                        :
                        <Text style={styles.nameText}>
                            {`Guest`}
                        </Text>
                    }

                </View>
                <View style={styles.iconBackground}>
                    <Icon action={() => { routeTo({ routeStack, setPage, setRouteStack, newPage: navItems[8] }) }} badge={0} name={"search"} size={24} color={colorPalete.silver_silk} />
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