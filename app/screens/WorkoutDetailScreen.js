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
import TemplateMovement from "../components/TemplateMovement";

function WorkoutDetailScreen({ route }) {
  const { workout } = route.params;
  let key = 1;
  return (
    <SafeContainer>
      <FlexBox>
        <ScrollView>
          <Header>{workout.title}</Header>
          <ContentText>{formatDateTime(workout.lastPerformed)}</ContentText>
          {workout.content.map((movement) => (
            <TemplateMovement
              key={key++}
              name={movement.name}
              numSets={movement.numSets}
              muscles={movement.muscles}
            />
          ))}
        </ScrollView>
        <ButtonContainer>
          <Button title="START WORKOUT" />
        </ButtonContainer>
      </FlexBox>
    </SafeContainer>
  );
}

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Define options for toLocaleDateString
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Define options for toLocaleTimeString
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format date and time separately
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
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

export default WorkoutDetailScreen;
