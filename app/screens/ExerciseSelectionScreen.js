import React from "react";
import { SafeAreaView, ScrollView, Platform, StatusBar } from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader } from "../config/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import Exercise from "../components/Exercise";

const exerciseData = require("../data/exerciseData.json");

const sortedExercises = exerciseData.sort((a, b) =>
  a.name.localeCompare(b.name)
);

function ExerciseSelectionScreen() {
  let currentLetter = "";

  const navigation = useNavigation();
  const route = useRoute();

  const handleExercisePress = (exercise) => {
    const selectedExercise = {
      id: Date.now(),
      name: exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      sets: [],
      muscles: [
        exercise.bodyPart.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
          letter.toUpperCase()
        ),
      ],
    };
    if (route.params?.fromTemplate) {
      navigation.navigate("CreateTemplateScreen", { selectedExercise });
    } else if (route.params?.fromWorkout) {
      navigation.navigate("OngoingWorkoutScreen", { selectedExercise });
    }
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Header>Exercises</Header>
        {sortedExercises.map((exercise, index) => {
          const firstLetter = exercise.name.charAt(0).toUpperCase();
          const showSubHeader = firstLetter !== currentLetter;
          if (showSubHeader) {
            currentLetter = firstLetter;
          }
          return (
            <React.Fragment key={index}>
              {showSubHeader && <SubHeader>{firstLetter}</SubHeader>}
              <Exercise
                name={exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
                muscles={exercise.bodyPart.replace(
                  /(^\w{1})|(\s+\w{1})/g,
                  (letter) => letter.toUpperCase()
                )}
                onPress={() => handleExercisePress(exercise)}
              />
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeContainer>
  );
}

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export default ExerciseSelectionScreen;
