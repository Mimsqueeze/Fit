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

import { AlphabetList } from "react-native-section-alphabet-list";

import { exercises } from "../data/Exercise";
// const exercises = require("../data/exercises.json");

function ExerciseScreen() {
  return (
    <SafeAreaView>
      <AlphabetList
        data={exercises}
        indexLetterStyle={{ color: "lightblue", fontSize: 15 }}
        renderCustomItem={(item) => (
          <View style={styles.divide}>
            <Pressable style={styles.item}>
              <Image style={styles.img} source={item.photo}></Image>
              <Text style={styles.text}>{item.value}</Text>
            </Pressable>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },

  img: {
    height: 50,
    width: 50,
    verticalAlign: "middle",
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  desc: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  divide: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginHorizontal: 7,
  },
});

export default ExerciseScreen;
