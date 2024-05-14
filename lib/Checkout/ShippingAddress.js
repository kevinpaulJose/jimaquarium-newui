import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { colorPalete } from "../constants"
import { Icon } from "../Shared/Icon"
import { dummyAddress } from "../Temp/dummy"
import { useContext, useEffect, useState } from "react"
import React from "react"
import DashedLine from "./Shared/DashedLine"
import { getProductsAndTotal, navItems, routeTo } from "../utils"
import { AppContext } from "../../App"
import makeApiRequest from "../api"

export default function ShippingAddress() {
    const { setRouteStack, routeStack, setPage, setSelectedAddress, address, setSnackSeverity,
        setOpenSnackbar, setOpenSnackbarContent, setAddress, userDetails, setTotal, cart, products, setShipping
    } = useContext(AppContext);
    const [defaultAddress, setDefaultAddress] = useState(address[0])
    useEffect(() => {
        if (address.length === 0) {
            setSnackSeverity("warning");
            setOpenSnackbar(true);
            setOpenSnackbarContent("Add primary address to continue");
            setSelectedAddress(null)
            routeToAddress({ address: null })
        }

    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    const setDefault = async (ad) => {

        let addressList = address;
        let addedAddressIndex = addressList.findIndex(v => v.id === ad.id);
        addressList = addressList.map(v => { return ({ ...v, default: false }); });
        if (addedAddressIndex !== -1) {
          addressList[addedAddressIndex] = { ...ad, default: true };
        }
        let res = await makeApiRequest(
          "POST",
          { userId: userDetails?.email, address: addressList },
          "/address/add",
          setSnackSeverity,
          setOpenSnackbar,
          setOpenSnackbarContent
        );
        if (res?.status === 200) {
          setAddress(addressList);
          setSelectedAddress(null);
          toggleExpanded();
        }
      }
    useEffect(() => {
        let defaultAddress = address.filter(ad => {
            return ad.default
        })
        setDefaultAddress(defaultAddress[0]);
        console.log(defaultAddress);
    }, address);

    useEffect(() => {

        setShipping(getProductsAndTotal(cart, products, defaultAddress.pin).shipping);
      }, [defaultAddress]);

    const [expanded, setExpanded] = useState(false);

    const routeToAddress = ({ address }) => {
        setSelectedAddress(address);
        routeTo({ setRouteStack, newPage: navItems[6], routeStack, setPage })
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Shipping Information
                </Text>
                <Pressable onPress={() => routeToAddress({ address: null })}>
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
                            {address.map((ad, index) => (
                                <React.Fragment key={ad.id + index} >
                                    <Pressable onPress={() => {setDefault(ad)}} style={styles.mainAddressContainer}>
                                        <View style={styles.editContainer}>
                                            <Text style={styles.nameText}>
                                                {`${ad.name}`}

                                            </Text>
                                            <View style={styles.editIcon}>
                                                <Icon name={"pencil"} size={12} action={() => { routeToAddress({ address: ad }) }} active={false} badge={0} color={colorPalete.eerie_black} />

                                            </View>

                                        </View>

                                        <Text style={styles.addressText}>
                                            {`${ad.line1}, ${ad.line2},`}
                                        </Text>
                                        <Text style={styles.addressText}>
                                            {`${ad.city}, ${ad.state} - ${ad.pin}`}
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
                                {defaultAddress.name}
                            </Text>
                            <Text style={styles.addressText}>
                                {`${defaultAddress.line1}, ${defaultAddress.line2},`}
                            </Text>
                            <Text style={styles.addressText}>
                                {`${defaultAddress.city}, ${defaultAddress.state} - ${defaultAddress.pin}`}
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