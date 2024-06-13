import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "../../Shared/Icon";
import { colorPalete } from "../../constants";
import { LinearGradient } from 'expo-linear-gradient';
import { navItems, routeTo } from "../../utils";
import { useContext } from "react";
import { AppContext } from "../../../App";

export default function PromotionCard({promotion, gradient, primary}) {
    const {  setPage, setRouteStack, routeStack, setSelectedProduct

    } = useContext(AppContext);
    return(
        <>
            <LinearGradient start={[0, 0]}
          end={[1, 0]} colors={gradient} style={styles.container}>
            <Pressable onPress={() => {
                    setSelectedProduct(promotion);
                    routeTo({ routeStack, newPage: navItems[4], setPage, setRouteStack })
                }}>
            <Text style={styles.nameText}>{promotion.name}</Text>
                <Text style={{...styles.titleText, color: primary}}>{"Special Offer"}</Text>
                <View style={styles.imgContainer}>
                    <Text style={{...styles.descText, color: primary}}>{promotion.desc}</Text>
                    <Image style={styles.image} source={{uri: promotion.img}} />
                </View>
                <View style={{...styles.buyTextContainer , borderColor: primary}}>
                <Text style={{...styles.buyText, color: primary}}>BUY NOW</Text>
                </View>
            </Pressable>
               
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: colorPalete.silver,
        // borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 15,
        width: Platform.OS !== "web" ? Dimensions.get("window").width - 100 : 300
    },
    imgContainer: {
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "space-between"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderRadius: 10,
        
    },
    descText: {
        // color: colorPalete.may_green,
        fontSize: 16,
        width: Platform.OS !== "web" ? (Dimensions.get("window").width - 100)/2 : 150
    },
    nameText: {
        color: colorPalete.wild_sand,
        fontSize: 18
    },
    titleText: {
        // color: colorPalete.may_green,
        fontSize: 28,
        fontWeight: "600"
    },
    buyText: {
        textTransform: "uppercase",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 12
    },
    buyTextContainer: {
        // paddingTop: 5,
        // paddingBottom: 5,
        // paddingLeft: 10,
        // paddingRight: 10,
        borderRadius: 100,
        borderWidth: 2,
        height: 35,
        width: 100,
        justifyContent: "center",

        
    }

})