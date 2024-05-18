import { StyleSheet, Text, View } from "react-native";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { useContext } from "react";
import { AppContext, logout } from "../../App";
import { removeData } from "../utils";

export default function ProfileAppBar() {
    const { isUserLoggedIn, setIsUserLoggedIn, setLoggingOut, loggingOut,
        setUserDetails, userDetails, setAddress, setOrders, setCart, setConsent,consent,
     } = useContext(AppContext);
    // const logOut = () => {
    //     removeData({key: "user"});
    //     setIsUserLoggedIn(false);
    //     setUserDetails({});
    //     setAddress([]);
    //     setOrders([]);
    //     setCart([]);
    // }

    const handleLogout = () => {
        setConsent({
            label: "Do you want to Log out?",
            action: async () => {
                await logout({ setIsUserLoggedIn, setUserDetails, setAddress, setOrders, setCart, setLoggingOut, loggingOut })
                setConsent({
                    label: "",
                    action: () => {},
                    visible: false,
                    activeLabel: ""
                })
            },
            visible: true,
            activeLabel: "LogOut"
        })
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>
                        {`Account Settings`}
                    </Text>
                </View>
                {userDetails.name && <View style={styles.iconBackground}>
                    <Icon action={handleLogout} badge={0} name={"sign-out"} size={20} color={colorPalete.silver_silk} />
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