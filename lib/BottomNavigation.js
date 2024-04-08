import { StyleSheet, Text, View } from "react-native";
import { Icon } from "./Shared/Icon";
import { colorPalete } from "./constants";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { MotiView } from 'moti';




export default function BottomNavigation() {
    const { page, setPage, cart } = useContext(AppContext);
    const navItems = [{ label: "home", page: "home" },
    { label: "archive", page: "cart" },
    { label: "container", page: "orders" }, { label: "person", page: "profile" },
    { label: "home", page: "productDetail", disabled: true }]
    return (
        <View style={styles.container}>
            {navItems.map((v, _) => !v.disabled && (
                <>

                    {page.label === v.label ? <MotiView from={{
                        translateY: -10
                    }}
                        animate={{
                            translateY: 0
                        }}
                        transition={{
                            type: 'spring',
                        }}>
                        <Icon name={v.label} size={28} action={() => { setPage(v); }} active={page.label === v.label}
                            badge={v.page !== "cart" ? 0 : cart.length} />
                    </MotiView> :
                        <>
                            <Icon name={v.label} size={28} action={() => { setPage(v); }} active={page.label === v.label}
                                badge={v.page !== "cart" ? 0 : cart.length} />
                        </>
                    }



                </>
            ))}



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        backgroundColor: colorPalete.wild_sand,
        width: "100%",
        height: 90,
        position: "fixed",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },

})