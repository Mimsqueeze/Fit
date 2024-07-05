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

function ProfileScreen(props) {
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {[styles.heading]}>
        Profile
      </Text>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 600,
  },

  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
  },
});

export default ProfileScreen;
