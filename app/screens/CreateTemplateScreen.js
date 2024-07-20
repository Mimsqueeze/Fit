import React, { useState, useEffect } from "react";
import { View, Button, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseItem from "../components/ExerciseItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TemplateTitleInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

export let saveTemplate; // Declare the saveTemplate function

function CreateTemplateScreen({ navigation }) {
  const [title, setTitle] = useState("New Workout Template");
  const [exercises, setExercises] = useState([]);
  const [numExercises, setNumExercises] = useState(1);

  const addExercise = () => {
    const newExercise = {
      id: numExercises,
      name: "New Exercise",
      sets: [],
      muscles: [],
    };
    setExercises([...exercises, newExercise]);
    setNumExercises(numExercises + 1);
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

  saveTemplate = async () => {
    try {
      const newTemplate = {
        id: Date.now(),
        title,
        content: exercises,
      };
      const jsonValue = await AsyncStorage.getItem("@templateData");
      const templates = jsonValue != null ? JSON.parse(jsonValue) : [];
      templates.push(newTemplate);
      await AsyncStorage.setItem("@templateData", JSON.stringify(templates));

      navigation.goBack(); // Navigate back after saving
    } catch (e) {
      console.error(e);
    }
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
