import React, { useState } from "react";
import { SafeAreaView, ScrollView, Platform, StatusBar, TextInput } from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader } from "../config/style";
import { useNavigation } from "@react-navigation/native";
import Exercise from "../components/Exercise";

const exerciseData = require("../data/exerciseData.json");

const sortedExercises = exerciseData.sort((a, b) =>
  a.name.localeCompare(b.name)
);

function ExerciseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  let currentLetter = "";

  const navigation = useNavigation();

  const handleExercisePress = (exercise) => {
    navigation.navigate("ExerciseDetailScreen", { exercise });
  };

  // Function to filter exercises based on search query
  const filteredExercises = sortedExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeContainer>
      <ScrollView>
        <Header>Exercises</Header>
        <SearchBar
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
                name={exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
                photo={exercise.gifUrl}
                description={exercise.instructions}
                muscles={exercise.bodyPart}
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
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const SearchBar = styled(TextInput)`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 5px;
`;

export default ExerciseScreen;