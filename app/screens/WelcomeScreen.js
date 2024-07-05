import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableNativeFeedback,
  View,
  Button,
  Alert,
} from "react-native";

import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Text>This is the welcome Screen</Text>
      <TouchableNativeFeedback onPress={() => console.log("Image tapped")}>
        <View
          style={{ width: 200, height: 100, backgroundColor: colors.primary }}
        ></View>
      </TouchableNativeFeedback>
      <Button
        color={colors.secondary}
        title="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default WelcomeScreen;