import { useContext } from "react";
import { Text } from "react-native";
import { AppContext } from "../../App";
import { routeTo } from "../utils";

export default function Home() {
    const { page, setPage, cart, setRouteStack, routeStack } = useContext(AppContext);
        return(
            <>
                <Text onPress={() => {
                    routeTo({routeStack, setPage, setRouteStack, 
                        newPage: { label: "home", page: "productDetail", disabled: true }})
            }}>Home</Text>
            </>
        )
}