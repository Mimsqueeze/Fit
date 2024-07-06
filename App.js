import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import HistoryScreen from "./app/screens/HistoryScreen";
import MeasureScreen from "./app/screens/MeasureScreen";
import TimerScreen from "./app/screens/TimerScreen";
import WorkoutScreen from "./app/screens/WorkoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerLeft: null, headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="Measure"
          component={MeasureScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{ headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
