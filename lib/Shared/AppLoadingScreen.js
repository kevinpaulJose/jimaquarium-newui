import LottieView from 'lottie-react-native'
import { Dimensions, StyleSheet, View } from 'react-native'

export const AppLoadingScreen = () => {
    return(
        <View style={styles.container}>
         <View style={styles.lottie} >
        <LottieView style={styles.lottie} loop={true} autoPlay source={require('../../assets/loadingApp.json')} />

         </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 30
    },
    container: {
        position: "absolute",
        top: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "white",
    }
})