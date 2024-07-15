import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";

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

const ContentText = styled.Text`
  font-size: 14px;
  color: #666;
  font-weight: bold;
`;

const Workout = ({ title, lastPerformed, content, onPress }) => {
  // Calculate how many days ago the workout was performed
  const daysAgo = () => {
    const today = new Date();
    const performedDate = new Date(lastPerformed);
    const diffTime = Math.abs(today - performedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <WorkoutContainer>
        <WorkoutTitle>{title}</WorkoutTitle>
        <ContentText>Last performed: {daysAgo()} days ago</ContentText>
        <WorkoutContent>
          {content.map((item, index) => (
            <ContentText key={index}>
              {item.sets} x {item.workout}
            </ContentText>
          ))}
        </WorkoutContent>
      </WorkoutContainer>
    </TouchableNativeFeedback>
  );
};

export default Workout;
