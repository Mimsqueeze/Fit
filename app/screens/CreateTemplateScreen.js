import React, { useState } from "react";
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

const newTemplate = {
  id: {},
  title: "Pull",
  content: [
    {
      name: "Pull Ups",
      numSets: 3,
      sets: [
        { type: "working", lbs: 10, reps: 12, rir: 3 },
        { type: "working", lbs: 10, reps: 12, rir: 2 },
        { type: "working", lbs: 10, reps: 12, rir: 0 },
      ],
      muscles: ["Lats", "Biceps"],
    },
  ],
  lastPerformed: "",
  time: {},
};

const TemplateTitleInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

function CreateTemplateScreen() {
  const [title, setTitle] = useState("New Workout Template");
  const [exercises, setExercises] = useState(newTemplate.content);

  const addExercise = () => {
    const newExercise = {
      name: "New Exercise",
      numSets: 0,
      sets: [],
      muscles: [],
    };
    setExercises([...exercises, newExercise]);
  };

  const handleRemoveExercise = (index) => {
    console.log(index);
    console.log(exercises[index]);
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

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
            key={index}
            name={exercise.name}
            numSets={exercise.numSets}
            sets={exercise.sets}
            muscles={exercise.muscles}
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
  justify-content: flex-start; /* Changed from 'left' to 'flex-start' */
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

const TimeContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

export default CreateTemplateScreen;
