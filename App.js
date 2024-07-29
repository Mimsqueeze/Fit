import React from "react";
import { NavigationContainer, Text } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import ProfileScreen from "./app/screens/ProfileScreen";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import HistoryScreen from "./app/screens/HistoryScreen";
import TimerScreen from "./app/screens/TimerScreen";
import TemplateDetailScreen from "./app/screens/TemplateDetailScreen";
import WorkoutDetailScreen from "./app/screens/WorkoutDetailScreen";
import CreateTemplateScreen, {
  saveTemplate,
} from "./app/screens/CreateTemplateScreen";
import OngoingWorkoutScreen, {
  saveWorkout,
} from "./app/screens/OngoingWorkoutScreen";
import ExerciseDetailScreen from "./app/screens/ExerciseDetailScreen";
import WorkoutScreen from "./app/screens/WorkoutScreen";
import styled from "styled-components/native";
import ExerciseSelectionScreen from "./app/screens/ExerciseSelectionScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const SaveText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const screenOptions = {
  animation: "none",
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === " Profile ") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === " History ") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          } else if (route.name === " Workout ") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === " Exercise ") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === " Timer ") {
            iconName = focused ? "timer" : "timer-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }, tabBarLabelStyle: {
          fontSize: 12, // Adjust font size if needed
          overflow: 'visible',
        },
      })}
    >
      <Tab.Screen
        name=" Profile "
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name=" History "
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name=" Workout "
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name=" Exercise "
        component={ExerciseScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name=" Timer "
        component={TimerScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TemplateDetailScreen"
          component={TemplateDetailScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="WorkoutDetailScreen"
          component={WorkoutDetailScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="ExerciseDetailScreen"
          component={ExerciseDetailScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="ExerciseSelectionScreen"
          component={ExerciseSelectionScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="CreateTemplateScreen"
          component={CreateTemplateScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  if (saveTemplate) saveTemplate();
                }}
              >
                <SaveText>SAVE</SaveText>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="OngoingWorkoutScreen"
          component={OngoingWorkoutScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-down-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  saveWorkout();
                }}
              >
                <SaveText>FINISH</SaveText>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
