import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlexBox = styled(View)`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

function HistoryScreen() {
  const [workoutData, setWorkoutData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@workoutData");
        if (jsonValue != null) {
          setWorkoutData(JSON.parse(jsonValue));
        } else {
          // If there is no data, initialize with some default workouts
          const defaultWorkouts = [
            {
              id: 1,
              title: "Push",
              content: [
                {
                  name: "Bench Press",
                  numSets: 3,
                  sets: [
                    { type: "warmup", lbs: 50, reps: 12, rir: 4 },
                    { type: "working", lbs: 50, reps: 12, rir: 3 },
                    { type: "drop", lbs: 50, reps: 12, rir: 1 },
                  ],
                  muscles: ["Chest", "Triceps"],
                },
                {
                  name: "Overhead Press",
                  numSets: 5,
                  sets: [
                    { type: "working", lbs: 80, reps: 10, rir: 3 },
                    { type: "working", lbs: 80, reps: 10, rir: 3 },
                    { type: "working", lbs: 80, reps: 10, rir: 5 },
                  ],
                  muscles: ["Front Delts", "Triceps"],
                },
              ],
              lastPerformed: "2024-07-14T12:34:56",
              time: 4020,
            },
            {
              id: 2,
              title: "Pull",
              content: [
                {
                  name: "Pull Ups",
                  numSets: 3,
                  sets: [
                    { type: "working", lbs: 10, reps: 12, rir: 3 },
                    { type: "working", lbs: 10, reps: 12, rir: 2 },
                    { type: "working", lbs: 10, reps: 12, rir: 0 },
                  ],
                  muscles: ["Lats", "Biceps"],
                },
                {
                  name: "Deadlift",
                  numSets: 2,
                  sets: [
                    { type: "working", lbs: 225, reps: 12, rir: 3 },
                    { type: "working", lbs: 225, reps: 12, rir: 3 },
                    { type: "working", lbs: 245, reps: 12, rir: 3 },
                  ],
                  muscles: ["Lower Back", "Quads", "Glutes"],
                },
              ],
              lastPerformed: "2024-07-12T09:15:30",
              time: 3080,
            },
            {
              id: 3,
              title: "Legs",
              content: [
                {
                  name: "Deadlift",
                  numSets: 2,
                  sets: [
                    { type: "working", lbs: 225, reps: 12, rir: 3 },
                    { type: "working", lbs: 225, reps: 12, rir: 3 },
                    { type: "working", lbs: 245, reps: 12, rir: 3 },
                  ],
                  muscles: ["Lower Back", "Quads", "Glutes"],
                },
              ],
              lastPerformed: "2024-06-12T09:15:30",
              time: 3080,
            },
            {
              id: 4,
              title: "Full Body",
              content: [
                {
                  name: "Push Ups",
                  numSets: 3,
                  sets: [
                    { type: "working", lbs: 10, reps: 12, rir: 3 },
                    { type: "working", lbs: 10, reps: 12, rir: 2 },
                    { type: "working", lbs: 10, reps: 12, rir: 0 },
                  ],
                  muscles: ["Lats", "Biceps"],
                },
              ],
              lastPerformed: "2023-03-12T09:15:30",
              time: 3080,
            },
          ];
          setWorkoutData(defaultWorkouts);
          await AsyncStorage.setItem(
            "@workoutData",
            JSON.stringify(defaultWorkouts)
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchWorkouts();
  }, []);

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
