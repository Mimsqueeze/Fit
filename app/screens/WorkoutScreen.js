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
        const defaultTemplates = [];
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

  const handleEditTemplate = (id) => {
    const template = templateData.find((template) => template.id === id);
    navigation.navigate("CreateTemplateScreen", { template });
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
            onEdit={handleEditTemplate} // Pass the edit handler
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
