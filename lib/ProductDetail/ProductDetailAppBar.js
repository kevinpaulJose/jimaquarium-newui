import { StyleSheet, Text, View } from "react-native";
import { MotiView } from 'moti';
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { navItems, routePrevious, routeTo } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function ProductDetailAppBar() {
    const { page, setPage, cart, setRouteStack, routeStack } = useContext(AppContext);
    return (
        <>
            {/* <MotiView
                from={{
                    opacity: 0.7,
                    scale: 0.7,
                    // height: 0
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    // height: 200,
                }}
                transition={{
                    type: 'timing',
                }}
            > */}
                <View style={styles.container}>
                    <View style={styles.iconWithoutBackground}>
                        <Icon action={() => { routePrevious({ routeStack, setPage, setRouteStack }) }} badge={0} name={"arrow-left"} size={26} color={colorPalete.silver_silk} />
                    </View>
                    <View style={styles.iconBackground}>
                        <Icon action={() => { routeTo({routeStack, newPage: navItems[1], setPage, setRouteStack}) }} badge={cart.length} name={"archive"} size={22} color={colorPalete.silver_silk} />
                    </View>

                </View>
            {/* </MotiView> */}

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