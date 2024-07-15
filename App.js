import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "./app/screens/ProfileScreen";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import HistoryScreen from "./app/screens/HistoryScreen";
import TimerScreen from "./app/screens/TimerScreen";
import WorkoutScreen from "./app/screens/WorkoutScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "History") {
              iconName = focused ? "bookmarks" : "bookmarks-outline";
            } else if (route.name === "Workout") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Exercise") {
              iconName = focused ? "barbell" : "barbell-outline";
            } else if (route.name === "Timer") {
              iconName = focused ? "timer" : "timer-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Timer"
          component={TimerScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
