import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { MotiView } from 'moti';
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { routePrevious } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function SearchAppBar() {
    const { page, setPage, cart, setRouteStack, routeStack, searchText, setSearchText } = useContext(AppContext);
    return (
        <>
            <View style={styles.appBarContainer}>
                <MotiView
                    from={{
                        width: 50,
                        // marginRight: 0
                    }}
                    animate={{
                        width: Dimensions.get("window").width - 100,
                        // marginRight: 200,
                        // backgroundColor: "red"
                    }}
                    transition={{
                        type: 'timing',
                    }}
                >
                    <View style={styles.iconBackground}>
                        <Icon action={() => { }} badge={0} name={"search"} size={24} color={colorPalete.silver} />
                        <TextInput onChangeText={(text) => setSearchText(text)} value={searchText} style={styles.textStyle} placeholder="search" placeholderTextColor={colorPalete.silk} autoFocus enterKeyHint="done" cursorColor={colorPalete.lima} />
                        {searchText !== "" && 
                         <View style={styles.closeIcon}>

                         <Icon action={() => { setSearchText("") }} badge={0} name={"x"} size={24} color={colorPalete.silver} />

                     </View>
                        }
                       

                    </View>
                </MotiView>
                <View style={styles.iconWithoutBackground}>
                    <Icon action={() => { routePrevious({ routeStack, setPage, setRouteStack }) }} badge={0} name={"arrow-left"} size={26} color={colorPalete.silver_silk} />
                </View>

            </View>





        </>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        color: colorPalete.eerie_black,
        fontSize: 16,
        fontWeight: "600"
    },
    nameText: {
        color: colorPalete.eerie_black,
        fontSize: 22,
        fontWeight: "700"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    iconBackground: {
        backgroundColor: colorPalete.wild_sand,
        padding: 15,
        borderRadius: 100,
        flexDirection: "row"
    },
    textStyle: {
        marginLeft: 10,
        color: colorPalete.silver_silk,
        fontSize: 18,
        // backgroundColor: "red",
        flex: 1,
        // color: "yellow",
        textAlignVertical: "center"
    },
    appBarContainer: {
        // backgroundColor: "yellow",
        alignItems: "flex-end",
        flexDirection: "row-reverse"
    },
    iconWithoutBackground: {
        padding: 15,
        // backgroundColor: "red",
        flex: 1
    },
    closeIcon: {
        marginRight: 5
    }

})