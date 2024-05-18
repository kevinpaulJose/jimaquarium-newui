import { Dimensions, StyleSheet, Text, View, Pressable } from "react-native";
import { MotiView } from "moti";
import { colorPalete } from "../constants";
import { Icon } from "../Shared/Icon";
import { navItems, routePrevious, routeTo } from "../utils";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function AppBarGeneric({
  title,
  customAction,
  disableBackButton,
}) {
  const { page, setPage, cart, setRouteStack, routeStack } =
    useContext(AppContext);

  const runActions = () => {
    if (customAction) {
      customAction();
      routePrevious({ routeStack, setPage, setRouteStack });
    } else {
      routePrevious({ routeStack, setPage, setRouteStack });
    }
  };
  return (
    <>
      {/* <MotiView
                from={{
                    opacity: 0.7,
                    scale: 0.7,
                    // height: 0
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    // height: 200,
                }}
                transition={{
                    type: 'timing',
                }}
            > */}
      <View style={styles.container}>
        {!disableBackButton && (
          <Pressable onPress={runActions} style={styles.iconWithoutBackground}>
            <Icon
              action={runActions}
              badge={0}
              name={"arrow-left"}
              size={26}
              color={colorPalete.silver_silk}
            />
          </Pressable>
        )}

        <View style={styles.iconBackground}>
          <Text style={styles.headerText}>{title}</Text>

          {/* <Icon action={() => { routeTo({routeStack, newPage: navItems[1], setPage, setRouteStack}) }} badge={cart.length} name={"archive"} size={22} color={colorPalete.silver_silk} /> */}
        </View>
      </View>
      {/* </MotiView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // flex:1
  },
  iconBackground: {
    justifyContent: "center",
    // backgroundColor:"gray",
    flex: 1,
  },
  iconWithoutBackground: {
    padding: 15,
    // backgroundColor: "red"
  },
  headerText: {
    fontSize: 24,
    color: colorPalete.silver_silk,
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: -50,
  },
});
