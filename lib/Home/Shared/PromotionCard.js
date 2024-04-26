import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "../../Shared/Icon";
import { colorPalete } from "../../constants";
import { LinearGradient } from 'expo-linear-gradient';

export default function PromotionCard({promotion, gradient, primary}) {

    return(
        <>
            <LinearGradient start={[0, 0]}
          end={[1, 0]} colors={gradient} style={styles.container}>
                <Text style={styles.nameText}>{promotion.name}</Text>
                <Text style={{...styles.titleText, color: primary}}>{promotion.title}</Text>
                <View style={styles.imgContainer}>
                    <Text style={{...styles.descText, color: primary}}>{promotion.desc}</Text>
                    <Image style={styles.image} source={{uri: promotion.img}} />
                </View>
                <View style={{...styles.buyTextContainer , borderColor: primary}}>
                <Text style={{...styles.buyText, color: primary}}>BUY NOW</Text>
                </View>
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
        flexDirection: "row"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain"
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