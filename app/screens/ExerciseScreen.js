import React from "react";
import { SafeAreaView, ScrollView, Platform, StatusBar } from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader } from "../config/style";
import Exercise from "../components/Exercise";

const exerciseData = require("../data/exerciseData.json");

const sortedExercises = exerciseData.sort((a, b) =>
  a.name.localeCompare(b.name)
);

function ExerciseScreen() {
  let currentLetter = "";

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
            <React.Fragment key={exercise.key}>
              {showSubHeader && <SubHeader>{firstLetter}</SubHeader>}
              <Exercise
                name={exercise.name}
                photo={exercise.photo}
                description={exercise.description}
                muscles={exercise.muscles}
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
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export default ExerciseScreen;
