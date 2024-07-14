// Workout.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const WorkoutContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const WorkoutTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const WorkoutContent = styled.Text`
  font-size: 14px;
  color: #666;
`;

const Workout = ({ title, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <WorkoutContainer>
        <WorkoutTitle>{title}</WorkoutTitle>
        <WorkoutContent>{content}</WorkoutContent>
      </WorkoutContainer>
    </TouchableOpacity>
  );
};

export default Workout;
