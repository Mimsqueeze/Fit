import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ScrollView,
  Button,
  View,
} from "react-native";
import styled from "styled-components/native";
import Workout from "../assets/components/Template";

const templateData = require("../data/templateData.json");

function WorkoutScreen() {
  const handleWidgetPress = (id) => {
    Alert.alert("Button " + id + " " + "Pressed!");
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
        {templateData.map((widget) => (
          <Workout
            key={widget.id}
            title={widget.title}
            lastPerformed={widget.lastPerformed}
            content={widget.content}
            onPress={() => handleWidgetPress(widget.id)}
          />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}

const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const Header = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
`;

const SubHeader = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: 8px 0;
`;

export default WorkoutScreen;
