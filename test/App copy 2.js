import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableNativeFeedback,
  Image,
  SafeAreaView,
  Alert,
  View,
  Button,
  Platform,
  StatusBar,
} from "react-native";

export default function App() {
  console.log(Dimensions.get("screen"));
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          flexDirection: "row", // horizontal main axis
          justifyContent: "center", // aligns based on main axis
          alignItems: "center", // aligns based on secondary axis within each line
          // alignContent: "center", // aligns all content along secondary axis, only works if wrapping
          // flexWrap: "wrap",
        }}
      >
        <View
          style={{
            backgroundColor: "dodgerblue",
            // flexBasis: 100, // sets width/height based on primary axis
            width: 100,
            height: 100,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "gold",
            width: 100,
            height: 100,
            top: 20,
            left: 20,
            position: "absolute", // makes position based on container as a whole
          }}
        ></View>
        <View
          style={{
            backgroundColor: "tomato",
            width: 100,
            height: 100,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
