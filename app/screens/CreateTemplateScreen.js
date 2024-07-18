import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseItem from "../components/ExerciseItem";

const TemplateTitleInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

function CreateTemplateScreen() {
  const [title, setTitle] = useState("New Workout Template");
  const [exercises, setExercises] = useState([]);
  const [numExercises, setNumExercises] = useState(1);

  const addExercise = () => {
    const newExercise = {
      id: numExercises,
      name: "New Exercise",
      numSets: 0,
      sets: [],
      muscles: [],
    };
    setExercises([...exercises, newExercise]);
    setNumExercises(numExercises + 1); // Update numExercises in state
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleUpdateSets = (index, updatedSets) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets = updatedSets;
    setExercises(updatedExercises);
  };

  // Debugging
  // useEffect(() => {
  //   // This effect will run after every render when count changes
  //   console.log("Exercises updated:", exercises);
  //   // Perform any action that depends on the updated state here
  // }, [exercises]); // Dependency array ensures this effect runs only when count changes

  return (
    <SafeContainer>
      <ScrollView>
        <TitleContainer>
          <TemplateTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter template name"
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onUpdateSets={(updatedSets) => handleUpdateSets(index, updatedSets)}
            onRemoveExercise={() => handleRemoveExercise(index)}
          />
        ))}
        <ButtonContainer>
          <Button title="ADD EXERCISE" onPress={addExercise} />
        </ButtonContainer>
      </ScrollView>
    </SafeContainer>
  );
}

export const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;

export const TitleContainer = styled(SafeAreaView)`
  margin-top: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  margin: 3px 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export const DateTimeContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

export default CreateTemplateScreen;
