import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";
import { Ionicons } from "@expo/vector-icons";

const ExerciseContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ExerciseText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-top: 8px;
`;

const Exercise = ({ name, muscles, onPress}) => {
  return (<TouchableNativeFeedback onPress={onPress}>
    <ExerciseContainer>
      <ExerciseTitle>{name}</ExerciseTitle>
      <ContentText>{muscles}</ContentText>
    </ExerciseContainer>
  </TouchableNativeFeedback>
  )
};

export default Exercise;
