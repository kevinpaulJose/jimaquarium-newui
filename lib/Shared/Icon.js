
import { Octicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { colorPalete } from '../constants';
import { MotiView } from 'moti';
export const Icon = ({ name, active, action, label, size, color, fromNav = false, badge }) => {
    const getColor = () => {
        if (color) {
            return color;
        } else if (active) {
            return colorPalete.eerie_black
        } else {
            return colorPalete.silver
        }
    }
    const styles = StyleSheet.create({
        iconHover: {
            width: name==="person" ? 22: 24,
            height: 3,
            backgroundColor: getColor(),
            marginTop: 6,
            borderRadius: 50,
            marginLeft: name === "archive" && 2,
        },
        container: {
            flexDirection: "column",
        justifyContent: "space-evenly",
        justifyContent: "center"
        },
        badge: {
            width: 25,
            height: 25,
            backgroundColor: colorPalete.eerie_black,
            borderRadius: 100,
            position: "absolute",
            zIndex: 10,
            top: -20,
            right: -13,
            justifyContent: "center"
        },
        badge_text: {
            color: colorPalete.wild_sand,
            textAlign: "center",
            alignItems: "center",
            fontSize: 12
        }
    })
    return (
        <>
            <View style={styles.container}>
                {badge > 0 && <View style={styles.badge}>
                    <Text style={styles.badge_text}>
                        {`${badge}`}
                    </Text>
                    </View>}
                <Octicons name={name} size={size} color={getColor()} onPress={action} />
                {active && <View style={styles.iconHover} />}
            </View>


        </>

    )
}

