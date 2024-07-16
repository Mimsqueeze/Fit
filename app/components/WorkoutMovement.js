import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";

const WorkoutMovementContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const WorkoutMovementName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const WorkoutMovement = ({ name, numSets, muscles }) => {
  return (
    <TouchableNativeFeedback>
      <WorkoutMovementContainer>
        <WorkoutMovementName>
          {numSets} x {name}
        </WorkoutMovementName>
        <ContentText>{muscles.join(", ")}</ContentText>
      </WorkoutMovementContainer>
    </TouchableNativeFeedback>
  );
};

export default WorkoutMovement;
