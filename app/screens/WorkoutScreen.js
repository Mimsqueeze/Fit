import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  View,
} from "react-native";
import { Header, SubHeader } from "../config/style";
import styled from "styled-components/native";
import Template from "../components/Template";
import { useNavigation } from "@react-navigation/native";

const templateData = require("../data/templateData.json");

function WorkoutScreen() {
  const navigation = useNavigation();

  const handleTemplatePress = (workout) => {
    navigation.navigate("DetailScreen", { workout });
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Header>Workout</Header>
        <SubHeader>QUICK START</SubHeader>
        <ButtonContainer>
          <Button title="START AN EMPTY WORKOUT" />
        </ButtonContainer>
        <SubHeader>MY TEMPLATES</SubHeader>
        {templateData.map((workout) => (
          <Template
            key={workout.id}
            title={workout.title}
            lastPerformed={workout.lastPerformed}
            content={workout.content}
            onPress={() => handleTemplatePress(workout)}
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
