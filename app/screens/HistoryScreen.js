import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
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

  // Function to group workouts by month and handle the year display conditionally
  const groupWorkoutsByMonth = (data) => {
    const currentYear = new Date().getFullYear();
    return data.reduce((acc, workout) => {
      const date = new Date(workout.lastPerformed);
      const year = date.getFullYear();
      let month = date
        .toLocaleString("default", { month: "long" })
        .toUpperCase();
      if (year !== currentYear) {
        month += ` ${year}`;
      }
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(workout);
      return acc;
    }, {});
  };

  const groupedWorkouts = groupWorkoutsByMonth(workoutData);

  return (
    <SafeContainer>
      <ScrollView>
        <Header>History</Header>
        {Object.keys(groupedWorkouts).map((month) => (
          <View key={month}>
            <SubHeader>{month}</SubHeader>
            {groupedWorkouts[month].map((workout) => (
              <Workout
                key={workout.id}
                title={workout.title}
                lastPerformed={workout.lastPerformed}
                time={workout.time}
                content={workout.content}
                onPress={() => handleWorkoutPress(workout)}
              />
            ))}
          </View>
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
