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
import { useNavigation } from "@react-navigation/native";

function WorkoutDetailScreen({ route }) {
  const { workout } = route.params;
  const navigation = useNavigation();
  const handlePerformAgain = () => {
    let newWorkout = workout;
    newWorkout.title = "";
    navigation.navigate("OngoingWorkoutScreen", { template: newWorkout });
  };
  return (
    <SafeContainer>
      <FlexBox>
        <ScrollView>
          <Header>{workout.title}</Header>
          <DateTimeContainer>
            <ContentText>{formatDateTime(workout.lastPerformed)}</ContentText>
            <TimeContainer>
              <Ionicons name="time-outline" size={20} color="#666" />
              <ContentText>{formatTime(workout.time)}</ContentText>
            </TimeContainer>
          </DateTimeContainer>
          {workout.content.map((movement, index) => (
            <WorkoutMovement
              key={index}
              name={movement.name}
              numSets={movement.numSets}
              sets={movement.sets}
              muscles={movement.muscles}
            />
          ))}
        </ScrollView>
        <ButtonContainer>
          <Button title="PERFORM AGAIN" onPress={handlePerformAgain} />
        </ButtonContainer>
      </FlexBox>
    </SafeContainer>
  );
}

function formatTime(time) {
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
