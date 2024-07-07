import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import HistoryScreen from "./app/screens/HistoryScreen";
import MeasureScreen from "./app/screens/MeasureScreen";
import TimerScreen from "./app/screens/TimerScreen";
import WorkoutScreen from "./app/screens/WorkoutScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Exercise" component={ExerciseScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Measure" component={MeasureScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
