import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { colorPalete } from "../constants"
import { Icon } from "../Shared/Icon"
import { dummyAddress } from "../Temp/dummy"
import { useContext, useState } from "react"
import React from "react"
import DashedLine from "./Shared/DashedLine"
import { navItems, routeTo } from "../utils"
import { AppContext } from "../../App"

export default function ShippingAddress() {
    const { setRouteStack, routeStack, setPage, setSelectedAddress  } = useContext(AppContext);

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    const routeToAddress = ({address}) => {
        setSelectedAddress(address);
        routeTo({setRouteStack, newPage: navItems[6], routeStack, setPage})
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Shipping Information
                </Text>
                <Pressable onPress={() => routeToAddress({address: null})}>
                    <Text style={styles.editText}>Add</Text>
                </Pressable>
            </View>
            {

                expanded ?


                    <View style={styles.addressCardContainer}>
                        <View style={styles.iconAlign}>
                            <Icon name={"location"} size={34} action={() => { }} active={false} badge={0} color={colorPalete.eerie_black} />

                        </View>
                        <View style={styles.innerContainer}>
                            {dummyAddress.address.map((address, index) => (
                                <React.Fragment key={address.id + index} >
                                    <Pressable onPress={toggleExpanded} style={styles.mainAddressContainer}>
                                        <View style={styles.editContainer}>
                                            <Text style={styles.nameText}>
                                                {`${address.name}`}

                                            </Text>
                                            <View style={styles.editIcon}>
                                            <Icon name={"pencil"} size={12} action={() => { routeToAddress({address}) }} active={false} badge={0} color={colorPalete.eerie_black} />

                                            </View>

                                        </View>

                                        <Text style={styles.addressText}>
                                            {`${address.line1}, ${address.line2},`}
                                        </Text>
                                        <Text style={styles.addressText}>
                                            {`${address.city}, ${address.state} - ${address.pin}`}
                                        </Text>
                                    </Pressable>
                                    <DashedLine />
                                </React.Fragment>

                            ))}
                        </View>

                        <View style={styles.iconAlign}>
                            <Icon name={"chevron-up"} size={24} action={() => { toggleExpanded() }} active={false} badge={0} color={colorPalete.silver_silk} />
                        </View>

                    </View>

                    :
                    <Pressable onPress={toggleExpanded} style={styles.addressCardContainer}>
                        <Icon name={"location"} size={34} action={() => { }} active={false} badge={0} color={colorPalete.eerie_black} />
                        <View style={styles.mainAddressContainer}>
                            <Text style={styles.nameText}>
                                {dummyAddress.address[0].name}
                            </Text>
                            <Text style={styles.addressText}>
                                {`${dummyAddress.address[0].line1}, ${dummyAddress.address[0].line2},`}
                            </Text>
                            <Text style={styles.addressText}>
                                {`${dummyAddress.address[0].city}, ${dummyAddress.address[0].state} - ${dummyAddress.address[0].pin}`}
                            </Text>
                        </View>
                        <Icon name={"chevron-down"} size={24} action={() => { toggleExpanded() }} active={false} badge={0} color={colorPalete.silver_silk} />

                    </Pressable>


            }


        </>

    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        width: Dimensions.get("window").width - 40,
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    titleText: {
        fontSize: 20,
        color: colorPalete.eerie_black,
        // fontWeight: "600"
    },
    editText: {
        fontSize: 16,
        color: colorPalete.silk,
    },
    addressCardContainer: {
        flexDirection: "row",
        // backgroundColor: "red",
        padding: 10,
        width: Dimensions.get("window").width - 40,
        borderWidth: 2,
        borderColor: colorPalete.wild_sand,
        borderRadius: 20,
        justifyContent: "space-around",
        alignSelf: "center",
        marginTop: 7
    },
    mainAddressContainer: {
        // flexDirection: "column",
        // backgroundColor: "red"

    },
    nameText: {
        color: colorPalete.eerie_black,
        fontSize: 18,
    },
    addressText: {
        color: colorPalete.silk,
        fontSize: 16
    },
    innerContainer: {
        flexDirection: "column"
    },
    iconAlign: {
        paddingTop: 16
    },
    editContainer: {
        flexDirection: "row",
        // backgroundColor: "red"
    },
    editIcon: {
        marginLeft: 10,
        justifyContent: "center"
    }
})