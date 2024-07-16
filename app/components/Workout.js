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

const WorkoutContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
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

const WorkoutContent = styled.View`
  margin-top: 8px;
`;

const FlexBox = styled(SafeAreaView)`
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

export const ExerciseText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-top: 8px;
`;

const Workout = ({ title, lastPerformed, time, content, onPress }) => {
  // Calculate how many days ago the Workout was performed
  const formatDate = () => {
    const date = new Date(lastPerformed);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  function formatTime() {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    let formattedTime = "";
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0 || hours === 0) {
      formattedTime += `${minutes}m`;
    }
    return formattedTime.trim();
  }

  function bestSet(item) {
    const sets = item.sets;
    if (sets.length === 0) return null;

    // Initialize the best set as the first one
    let bestSet = sets[0];
    let maxWeight = bestSet.lbs * bestSet.reps;

    // Iterate over the sets to find the one with the highest total weight
    for (let i = 1; i < sets.length; i++) {
      const totalWeight = sets[i].lbs * sets[i].reps;
      if (totalWeight > maxWeight) {
        bestSet = sets[i];
        maxWeight = totalWeight;
      }
    }

    return bestSet.lbs + " lbs x " + bestSet.reps;
  }

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <WorkoutContainer>
        <WorkoutTitle>{title}</WorkoutTitle>
        <FlexBox>
          <ContentText>{formatDate()}</ContentText>
          <TimeContainer>
            <Ionicons name="time-outline" size={20} color="#666" />
            <ContentText>{formatTime()}</ContentText>
          </TimeContainer>
        </FlexBox>
        <FlexBox>
          <ExerciseText>Exercise</ExerciseText>
          <ExerciseText>Best set</ExerciseText>
        </FlexBox>
        <WorkoutContent>
          {content.map((item, index) => (
            <FlexBox key={index}>
              <ContentText>
                {item.numSets} x {item.name}
              </ContentText>
              <ContentText>{bestSet(item)}</ContentText>
            </FlexBox>
          ))}
        </WorkoutContent>
      </WorkoutContainer>
    </TouchableNativeFeedback>
  );
};

export default Workout;
