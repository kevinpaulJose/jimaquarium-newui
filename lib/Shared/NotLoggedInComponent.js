import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export default function NotLoggedInComponent() {
    return (
        <View>
            <LottieView style={styles.lottieStyle} loop={false} autoPlay source={require('../../assets/login.json')} />
        </View>
    )
}

const styles = StyleSheet.create({
    lottieStyle: {
        width: 400,
        height: 400,
        // backgroundColor: 'red'
    },
})