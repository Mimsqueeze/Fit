// WorkoutScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import { Header, SubHeader } from "../config/style";
import styled from "styled-components/native";
import Template from "../components/Template";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlexBox = styled(View)`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

function WorkoutScreen() {
  const [templateData, setTemplateData] = useState([]);
  const navigation = useNavigation();

  const fetchTemplates = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@templateData");
      if (jsonValue != null) {
        setTemplateData(JSON.parse(jsonValue));
      } else {
        // If there is no data, initialize with some default templates
        const defaultTemplates = [
          {
            id: 1,
            title: "Push",
            content: [
              {
                name: "Bench Press",
                sets: [
                  { type: "warmup", lbs: 50, reps: 12, rir: 4 },
                  { type: "working", lbs: 50, reps: 12, rir: 3 },
                  { type: "drop", lbs: 50, reps: 12, rir: 1 },
                ],
                muscles: ["Chest", "Triceps"],
              },
              {
                name: "Overhead Press",
                sets: [
                  { type: "working", lbs: 80, reps: 10, rir: 3 },
                  { type: "working", lbs: 80, reps: 10, rir: 3 },
                  { type: "working", lbs: 80, reps: 10, rir: 5 },
                ],
                muscles: ["Front Delts", "Triceps"],
              },
            ],
            lastPerformed: "2024-07-14T12:34:56",
            time: 4020,
          },
          {
            id: 2,
            title: "Pull",
            content: [
              {
                name: "Pull Ups",
                sets: [
                  { type: "working", lbs: 10, reps: 12, rir: 3 },
                  { type: "working", lbs: 10, reps: 12, rir: 2 },
                  { type: "working", lbs: 10, reps: 12, rir: 0 },
                ],
                muscles: ["Lats", "Biceps"],
              },
              {
                name: "Deadlift",
                sets: [
                  { type: "working", lbs: 225, reps: 12, rir: 3 },
                  { type: "working", lbs: 225, reps: 12, rir: 3 },
                  { type: "working", lbs: 245, reps: 12, rir: 3 },
                ],
                muscles: ["Lower Back", "Quads", "Glutes"],
              },
            ],
            lastPerformed: "2024-07-12T09:15:30",
            time: 3080,
          },
        ];
        setTemplateData(defaultTemplates);
        await AsyncStorage.setItem(
          "@templateData",
          JSON.stringify(defaultTemplates)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTemplates();
    }, [])
  );

  const handleTemplatePress = (workout) => {
    navigation.navigate("TemplateDetailScreen", { workout });
  };

  const handleAddPress = () => {
    navigation.navigate("CreateTemplateScreen");
  };

  const handleDeleteTemplate = async (id) => {
    try {
      const updatedTemplates = templateData.filter(
        (template) => template.id !== id
      );
      setTemplateData(updatedTemplates);
      await AsyncStorage.setItem(
        "@templateData",
        JSON.stringify(updatedTemplates)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenameTemplate = async (id, newTitle) => {
    try {
      const updatedTemplates = templateData.map((template) =>
        template.id === id ? { ...template, title: newTitle } : template
      );
      setTemplateData(updatedTemplates);
      await AsyncStorage.setItem(
        "@templateData",
        JSON.stringify(updatedTemplates)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Header>Workout</Header>
        <SubHeader>QUICK START</SubHeader>
        <ButtonContainer>
          <Button title="START AN EMPTY WORKOUT" />
        </ButtonContainer>
        <FlexBox>
          <SubHeader>MY TEMPLATES</SubHeader>
          <TouchableOpacity onPress={handleAddPress}>
            <Ionicons name="add-outline" size={24} color="black" />
          </TouchableOpacity>
        </FlexBox>
        {templateData.map((workout) => (
          <Template
            key={workout.id}
            id={workout.id} // Pass the ID to Template
            title={workout.title}
            lastPerformed={workout.lastPerformed}
            content={workout.content}
            onPress={() => handleTemplatePress(workout)}
            onDelete={handleDeleteTemplate} // Pass the delete handler
            onRename={handleRenameTemplate} // Pass the rename handler
          />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}

export const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export default WorkoutScreen;
