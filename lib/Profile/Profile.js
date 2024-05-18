import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { dummyProficePic } from "../Temp/dummy";
import { navItems, routeTo } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Icon } from "../Shared/Icon";
import { colorPalete } from "../constants";
import LottieView from 'lottie-react-native';
import NotLoggedInComponent from "../Shared/NotLoggedInComponent";

export default function Profile() {
    const { routeStack, setPage, setRouteStack, isUserLoggedIn, userDetails } = useContext(AppContext);

    const menuItems = [
        {
            id: "134",
            label: "Orders",
            action: () => routeTo({ routeStack, setPage, setRouteStack, newPage: navItems[2] })
        },
        {
            id: "135",
            label: "Privacy Policy",
            action: () => {
                Linking.openURL("https://jimaquarium.com/privacy")
            }
        },
        {
            id: "136",
            label: "Terms & Conditions",
            action: () => { 
                Linking.openURL("https://jimaquarium.com/terms")
            }
        },
        {
            id: "139",
            label: "Shipping & Returns",
            action: () => { 
                Linking.openURL("https://jimaquarium.com/terms")
            }
        },
        {
            id: "140",
            label: "Refund Policy",
            action: () => { 
                Linking.openURL("https://jimaquarium.com/terms")
            }
        },
        {
            id: "137",
            label: "Contact Us",
            action: () => { 
                Linking.openURL("https://jimaquarium.com/contact")
            }
        }
    ]
    return (
        userDetails.name ?
            <View>
                <View style={styles.profileContainer}>
                    <View>
                        <Image style={styles.image} source={{ uri: userDetails?.photo }} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {userDetails?.name}
                        </Text>
                        {/* <Text style={styles.nameText}>
                        {userDetails?.name}
                    </Text> */}
                        <Text style={styles.emailText}>
                            {userDetails?.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    {menuItems.map((menu, index) => (
                        <Pressable style={{ ...styles.menuItemContainer, borderBottomWidth: index === menuItems.length - 1 ? 0 : 2 }} onPress={menu.action} key={menu.id}>
                            <Text style={styles.menuText}>
                                {menu.label}
                            </Text>
                            <Icon action={() => { }} badge={0} name={"arrow-right"} size={20} color={colorPalete.silver_silk} />
                        </Pressable>
                    ))}
                </View>
            </View>
            :
            <NotLoggedInComponent />
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        //    backgroundColor: "red"
    },
    lottieStyle: {
        width: 400,
        height: 400,
        // backgroundColor: 'red'
    },
    profileContainer: {
        flexDirection: "row",
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderRadius: 100
    },
    nameText: {
        fontWeight: "600",
        fontSize: 25,
        color: colorPalete.eerie_black
    },
    emailText: {
        fontSize: 16,
        color: colorPalete.silk
    },
    nameContainer: {
        // backgroundColor: "red",
        justifyContent: "center",
        marginLeft: 20
    },
    listContainer: {
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        borderColor: colorPalete.silver,
        borderWidth: 2,
        marginTop: 20,
        borderRadius: 10
    },
    menuItemContainer: {
        borderBottomWidth: 2,
        borderBottomColor: colorPalete.silver,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    menuText: {
        fontSize: 18,
        color: colorPalete.silver_silk
    }
})