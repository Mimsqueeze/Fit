// DetailScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default DetailScreen;
