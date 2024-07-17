import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { Header, SubHeader, ContentText } from "../config/style";
import WorkoutMovement from "../components/WorkoutMovement";
import { Ionicons } from "@expo/vector-icons";

function WorkoutDetailScreen() {
  return (
    <SafeContainer>
      <Text>Hello</Text>
    </SafeContainer>
  );
}
export const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
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

export default WorkoutDetailScreen;
