import { React, useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

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
  back,
} from "./app/screens/OngoingWorkoutScreen";
import ExerciseDetailScreen, {
  saveExercise,
} from "./app/screens/ExerciseDetailScreen";
import WorkoutScreen from "./app/screens/WorkoutScreen";
import ExerciseSelectionScreen from "./app/screens/ExerciseSelectionScreen";
import OngoingContextProvider from "./app/contexts/OngoingWorkoutContext";
import { OngoingContext } from "./app/contexts/OngoingWorkoutContext";
import { Header, SubHeader } from "./app/config/style";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const SaveText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const BottomContainer = styled.View`
  flex-direction: column;
`;

const OngoingWorkoutContainer = styled.TouchableOpacity`
  height: 60px;
  background-color: #fff;
  border-bottom-width: 0.5px; /* Set the border width on the bottom */
  border-bottom-color: gray; /* Set the border color on the bottom */
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TabBarContainer = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: white;
  align-items: center;
  justify-content: space-around;
`;

const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const TabLabel = styled.Text`
  color: ${(props) => (props.focused ? "dodgerblue" : "gray")};
`;

const OngoingWorkoutText = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: bold;
  flex: 1;
`;

const Stopwatch = ({ ongoingWorkout }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  // The formatTime function
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  useEffect(() => {
    // Calculate the initial elapsed time
    const initialElapsedTime = Date.now() - ongoingWorkout.timeStarted;
    setElapsedTime(initialElapsedTime);

    // Set up an interval to update the elapsed time every second
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - ongoingWorkout.timeStarted);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [ongoingWorkout.timeStarted]);

  // Format the elapsed time
  const formattedTime = formatTime(elapsedTime);

  return <SubHeader>{formattedTime}</SubHeader>;
};

const MinimizeButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="chevron-down-outline" size={24} color="black" />
  </TouchableOpacity>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { ongoing, ongoingWorkout, updateOngoing } = useContext(OngoingContext);
  const handleContinueWorkout = () => {
    navigation.navigate("OngoingWorkoutScreen", { ongoing: ongoingWorkout });
  };

  return (
    <BottomContainer>
      {ongoing ? (
        <OngoingWorkoutContainer onPress={handleContinueWorkout}>
          <OngoingWorkoutText>{ongoingWorkout.title}</OngoingWorkoutText>
          <Stopwatch ongoingWorkout={ongoingWorkout} />
        </OngoingWorkoutContainer>
      ) : null}
      <TabBarContainer>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TabButton key={route.key} onPress={onPress}>
              <Ionicons
                name={
                  isFocused
                    ? options.tabBarIconActive
                    : options.tabBarIconInactive
                }
                size={24}
                color={isFocused ? "dodgerblue" : "gray"}
              />
              <TabLabel focused={isFocused}>{label}</TabLabel>
            </TabButton>
          );
        })}
      </TabBarContainer>
    </BottomContainer>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIconActive:
          route.name === " History "
            ? "bookmarks"
            : route.name === " Workout "
            ? "add-circle"
            : "barbell",
        tabBarIconInactive:
          route.name === " History "
            ? "bookmarks-outline"
            : route.name === " Workout "
            ? "add-circle-outline"
            : "barbell-outline",
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size if needed
          overflow: "visible",
        },
      })}
    >
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <OngoingContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: "none" }}>
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
            options={({ navigation }) => ({
              headerTitle: "",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    saveExercise();
                  }}
                >
                  <SaveText>SAVE</SaveText>
                </TouchableOpacity>
              ),
            })}
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
                <MinimizeButton
                  onPress={() => {
                    back();
                  }}
                />
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
    </OngoingContextProvider>
  );
}
