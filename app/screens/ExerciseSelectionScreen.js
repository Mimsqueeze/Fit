import styled from "styled-components/native";
import { Header, SubHeader } from "../config/style";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Exercise from "../components/Exercise";
import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ExerciseSelectionScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  let currentLetter = "";
  const [exerciseData, setExerciseData] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();

  const handleExercisePress = (exercise) => {
    console.log("hi");
    const selectedExercise = {
      id: Date.now(),
      name: exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      sets: [],
      muscles: exercise.muscles.split(", "),
    };
    if (route.params?.fromTemplate) {
      navigation.navigate("CreateTemplateScreen", { selectedExercise });
    } else if (route.params?.fromWorkout) {
      navigation.navigate("OngoingWorkoutScreen", { selectedExercise });
    }
  };

  const handleNewExercisePress = () => {
    navigation.navigate("ExerciseDetailScreen");
  };

  const sortedExercises = exerciseData.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Function to filter exercises based on search query
  const filteredExercises = sortedExercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchExercises = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@exerciseData");
      if (jsonValue != null) {
        setExerciseData(JSON.parse(jsonValue));
      } else {
        // If there is no data, initialize with some default workouts
        const defaultExercises = require("../data/exerciseData.json");
        setExerciseData(defaultExercises);
        await AsyncStorage.setItem(
          "@exerciseData",
          JSON.stringify(defaultExercises)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExercises();
    }, [])
  );

  return (
    <SafeContainer>
      <TopBar>
        <Header>Exercises</Header>
        <TouchableNativeFeedback onPress={handleNewExercisePress}>
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableNativeFeedback>
      </TopBar>
      <SearchBar
        placeholder="Search exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        {filteredExercises.map((exercise, index) => {
          const firstLetter = exercise.name.charAt(0).toUpperCase();
          const showSubHeader = firstLetter !== currentLetter;
          if (showSubHeader) {
            currentLetter = firstLetter;
          }
          return (
            <React.Fragment key={index}>
              {showSubHeader && <SubHeader>{firstLetter}</SubHeader>}
              <Exercise
                exercise={exercise}
                onPress={() => handleExercisePress(exercise)}
              />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeContainer>
  );
}

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const SearchBar = styled(TextInput)`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-radius: 5px;
`;

export default ExerciseSelectionScreen;
