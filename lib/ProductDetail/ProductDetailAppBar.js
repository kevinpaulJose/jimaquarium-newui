import { StyleSheet, Text, View } from "react-native";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { routePrevious } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function ProductDetailAppBar() {
    const { page, setPage, cart, setRouteStack, routeStack } = useContext(AppContext);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.iconWithoutBackground}>
                    <Icon action={() => { routePrevious({routeStack, setPage}) }} badge={0} name={"arrow-left"} size={30} color={colorPalete.silver_silk} />
                </View>
                <View style={styles.iconBackground}>
                    <Icon action={() => { }} badge={0} name={"archive"} size={26} color={colorPalete.silver_silk} />
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    iconBackground: {
        backgroundColor: colorPalete.wild_sand,
        padding: 15,
        borderRadius: 100
    },
    iconWithoutBackground: {
        padding: 15
    }
})