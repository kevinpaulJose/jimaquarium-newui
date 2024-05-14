import { Dimensions, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { MotiView } from 'moti';
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { navItems, routePrevious, routeTo } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function SnackBar() {
    const { openSnackBarContent,
        snackSeverity,
        openSnackBar, setOpenSnackbar } = useContext(AppContext);

    // console.log("rendering");
    const getBgColor = () => {
        switch (snackSeverity) {
            case "error":
                return colorPalete.danger
            case "warning":
                return colorPalete.warning
            case "success":
                return colorPalete.may_green
            default:
                return colorPalete.warning
        }
    }
    const styles = StyleSheet.create({

        container: {
            // flexDirection: "row",
            // flex:1
            backgroundColor: getBgColor(),
            width: Dimensions.get("window").width - 40,
            alignSelf: "center",
            borderRadius: 5,
            justifyContent: "center"



        },
        innerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "blue"
        },
        infoText: {
            color: colorPalete.wild_sand,
            fontSize: 16,
            flex: 5,
            textAlignVertical: "center",
            marginLeft: 10,
            fontWeight: "600"

        },
        iconContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 10
        }

    })
    return (
        <>
            {openSnackBar ?
                <MotiView
                    from={{
                        translateY: -100,
                        height: 0
                    }}
                    animate={{
                        translateY: 0,
                        position: "absolute",
                        top: StatusBar.currentHeight + 10,
                        height: 50,
                    }}
                    transition={{
                        type: 'timing',
                    }}
                    style={styles.container}
                >
                    <View style={styles.innerContainer} >
                        <Text style={styles.infoText} numberOfLines={2}>{openSnackBarContent}</Text>
                        <Pressable onPress={() => setOpenSnackbar(false)} style={styles.iconContainer}>
                            <Icon action={() => { setOpenSnackbar(false) }} badge={0} name={"x"} size={20} color={colorPalete.wild_sand} />

                        </Pressable>
                    </View>
                </MotiView>

                :
                <MotiView
                    from={{
                        translateY: 0,
                        height: 50
                    }}
                    animate={{
                        translateY: -100,
                        height: 0
                    }}
                    transition={{
                        type: 'timing',
                    }}
                    style={styles.container}
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.infoText} numberOfLines={2}>{openSnackBarContent}</Text>
                        <Pressable onPress={() => setOpenSnackbar(false)} style={styles.iconContainer}>
                            <Icon action={() => { }} badge={0} name={"x"} size={20} color={colorPalete.wild_sand} />

                        </Pressable>
                    </View>
                </MotiView>
            }


        </>
    )
}

