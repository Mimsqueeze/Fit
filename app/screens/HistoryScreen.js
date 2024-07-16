import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  View,
} from "react-native";
import { Header, SubHeader } from "../config/style";
import styled from "styled-components/native";
import Workout from "../components/Workout";
import { useNavigation } from "@react-navigation/native";

const workoutData = require("../data/workoutData.json");

function HistoryScreen() {
  const navigation = useNavigation();

  const handleWorkoutPress = (workout) => {
    navigation.navigate("WorkoutDetailScreen", { workout });
  };

  return (
    <SafeContainer>
      <ScrollView>
        <Header>History</Header>
        <SubHeader>[month]</SubHeader>
        {workoutData.map((workout) => (
          <Workout
            key={workout.id}
            title={workout.title}
            lastPerformed={workout.lastPerformed}
            time={workout.time}
            content={workout.content}
            onPress={() => handleWorkoutPress(workout)}
          />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}

export const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export default HistoryScreen;
