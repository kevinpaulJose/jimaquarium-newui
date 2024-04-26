import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { MotiView } from 'moti';
import { AppContext } from "../../../App";
import { colorPalete } from "../../constants";
import { navItems, routeTo } from "../../utils";
import { Icon } from "../../Shared/Icon";

export default function CategorySelector() {
    const { routeStack, setPage, setRouteStack, categories, selectedCategory, setSelectedCategory } = useContext(AppContext);
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        routeTo({ routeStack, setPage, setRouteStack, newPage: navItems[9] })

    }
    return (
        <>
            <View style={styles.categoryHeader}>
                <Text style={styles.containerText}>Categories</Text>
                <Pressable style={{ ...styles.showAll, backgroundColor: selectedCategory === "" ? "transparent" : colorPalete.wild_sand, paddingLeft: selectedCategory === "" ? 0 : 10, paddingRight: selectedCategory === "" ? 0 : 10, justifyContent: selectedCategory === "" ? "flex-end" : "space-between" }} onPress={() => handleCategorySelect("")}>
                    <Text style={selectedCategory === "" ? styles.showAllText : styles.clearFilter}>
                        {selectedCategory !== "" ? "Clear filter" : "See all"}


                    </Text>
                    {selectedCategory !== "" &&
                        <View style={styles.addIcon}>
                            <Icon action={() => { }} badge={0} name={"x"} size={15} color={colorPalete.silver} />
                        </View>
                    }
                </Pressable>

            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                {categories.map((v, i) => v === selectedCategory ?
                    <MotiView key={`${v}-${i}`}
                        from={{
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            type: 'timing',
                        }}
                    >
                        <Pressable style={styles.categorySelected} onPress={() => handleCategorySelect(v)}>
                            <Text style={styles.categorySelectedText}>
                                {v}
                            </Text>
                        </Pressable>
                    </MotiView>
                    :
                    <Pressable key={`${v}-${i}-un`} style={styles.categoryUnselected} onPress={() => handleCategorySelect(v)} >
                        <Text style={styles.categoryUnSelectedText}>
                            {v}
                        </Text>
                    </Pressable>)}
            </ScrollView>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 10
    },
    categorySelected: {
        backgroundColor: colorPalete.eerie_black,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        marginRight: 10
    },
    categorySelectedText: {
        color: colorPalete.wild_sand
    },
    categoryUnselected: {
        borderColor: colorPalete.silver,
        borderWidth: 2,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        marginRight: 10
    },
    categoryUnSelectedText: {
        color: colorPalete.silver_silk
    },
    containerText: {
        color: colorPalete.silver_silk,
        fontSize: 20,
        fontWeight: "500"
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 20
    },
    showAll: {
        // justifyContent: "flex-end",
        //   backgroundColor: colorPalete.wild_sand,
        flexDirection: "row",
        width: 104,
        //   justifyContent: "space-between",
        alignContent: "center",
        //    paddingLeft: 10,
        // paddingRight: 10,
        borderRadius: 6

    },
    showAllText: {
        color: colorPalete.silver,
        paddingLeft: 10,
        paddingRight: 10,
        // paddingTop: 6,
        // paddingBottom: 6,

    },
    clearFilter: {
        // backgroundColor: colorPalete.wild_sand,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 6,
        // paddingBottom: 6,
        color: colorPalete.silver,
        textAlignVertical: "center"
        // borderRadius: 6,
    },
    addIcon: {
        // backgroundColor: "red",
        justifyContent: "center"
        // marginLeft: 10

    }
})