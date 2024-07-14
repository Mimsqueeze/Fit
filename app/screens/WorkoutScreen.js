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
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Workout from "../assets/components/Workout";

const workoutData = require("../data/workoutData.json");

function WorkoutScreen() {
  const handleWidgetPress = (id) => {
    Alert.alert("Button " + id + " " + "Pressed!");
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <Text style={[styles.heading]}>Workout</Text>
        {workoutData.map((widget) => (
          <Workout
            key={widget.id}
            title={widget.title}
            content={widget.content}
            onPress={() => handleWidgetPress(widget.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "column",
  },

  profileContainer: {
    flex: 1,
    margin: 30,
    flexDirection: "row",
  },

  pfp: {
    height: 50,
    width: 50,
  },

  profileInfo: {
    flex: 1,
    margin: 20,
    marginTop: 5,
    flexDirection: "column",
    flexDirection: "column",
  },

  name: {
    fontWeight: "bold",
    fontSize: 20,
  },

  workouts: {
    fontSize: 20,
    color: "grey",
  },

  widget: {
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    height: 200,
  },
});

export default WorkoutScreen;
