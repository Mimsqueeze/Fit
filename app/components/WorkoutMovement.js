import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  SafeAreaView,
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

export const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const WorkoutMovement = ({ name, numSets, sets, muscles }) => {
  let setNumber = 1;
  return (
    <TouchableNativeFeedback>
      <WorkoutMovementContainer>
        <WorkoutMovementName>
          {numSets} x {name}
        </WorkoutMovementName>
        {sets.map((set, index) => (
          <FlexBox key={index}>
            <ContentText>
              {set.type === "warmup"
                ? "W"
                : set.type === "working"
                ? setNumber++
                : "D"}
              : {set.lbs} lbs × {set.reps}
            </ContentText>
            <ContentText>RIR: {set.rir}</ContentText>
          </FlexBox>
        ))}
      </WorkoutMovementContainer>
    </TouchableNativeFeedback>
  );
};

export default WorkoutMovement;
