import React, { useState, useCallback } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  Modal,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { Header, SubHeader } from "../config/style";
import styled from "styled-components/native";
import Workout from "../components/Workout";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlexBox = styled(View)`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const sections = [
  {
    header: "PREFERENCES",
    items: [
      {
        label: "Units (kg/lbs)",
        message: "Feature coming soon!",
      },
      { label: "Theme", message: "Feature coming soon!" },
    ],
  },
  {
    header: "CONTACT",
    items: [
      {
        label: "Email Us",
        message: "Feature coming soon!",
      },
    ],
  },
];

function HistoryScreen() {
  const [workoutData, setWorkoutData] = useState([]);
  const navigation = useNavigation();

  const fetchWorkouts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@workoutData");
      if (jsonValue != null) {
        setWorkoutData(JSON.parse(jsonValue));
      } else {
        // If there is no data, initialize with some default workouts
        const defaultWorkouts = [];
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

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [])
  );

  const handleWorkoutPress = (workout) => {
    navigation.navigate("WorkoutDetailScreen", { workout });
  };

  const handleEditWorkout = (id) => {
    const workout = workoutData.find((workout) => workout.id === id);
    navigation.navigate("OngoingWorkoutScreen", { workout });
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const updatedWorkouts = workoutData.filter(
        (workout) => workout.id !== id
      );
      setWorkoutData(updatedWorkouts);
      await AsyncStorage.setItem(
        "@workoutData",
        JSON.stringify(updatedWorkouts)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenameWorkout = async (id, newTitle) => {
    try {
      const updatedWorkouts = workoutData.map((workout) =>
        workout.id === id ? { ...workout, title: newTitle } : workout
      );
      setWorkoutData(updatedWorkouts);
      await AsyncStorage.setItem(
        "@workoutData",
        JSON.stringify(updatedWorkouts)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const groupWorkoutsByMonth = (data) => {
    const currentYear = new Date().getFullYear();

    // Group workouts by month
    const grouped = data.reduce((acc, workout) => {
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

    // Sort workouts within each month by recency
    Object.keys(grouped).forEach((month) => {
      grouped[month].sort(
        (a, b) => new Date(b.lastPerformed) - new Date(a.lastPerformed)
      );
    });

    // Sort months by chronological order with recent months first
    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(
          a.split(" ")[0] + " 1, " + (a.split(" ")[1] || currentYear)
        );
        const dateB = new Date(
          b.split(" ")[0] + " 1, " + (b.split(" ")[1] || currentYear)
        );
        return dateB - dateA; // Recent months first
      })
      .reduce((acc, month) => {
        acc[month] = grouped[month];
        return acc;
      }, {});

    return sortedGrouped;
  };

  const groupedWorkouts = groupWorkoutsByMonth(workoutData);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (label, message) => {
    if (message) {
      Alert.alert(label, message);
    } else {
      Alert.alert(`Pressed: ${label}`);
    }
  };

  return (
    <SafeContainer>
      <ScrollView>
        <TopBar>
          <Header>History</Header>
          <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableNativeFeedback>
        </TopBar>
        {Object.keys(groupedWorkouts).map((month) => (
          <View key={month}>
            <SubHeader>{month}</SubHeader>
            {groupedWorkouts[month].map((workout) => (
              <Workout
                key={workout.id}
                workout={workout}
                onPress={() => handleWorkoutPress(workout)}
                onEdit={handleEditWorkout} // Pass the edit handler
                onDelete={handleDeleteWorkout} // Pass the delete handler
                onRename={handleRenameWorkout} // Pass the rename handler
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <SettingsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onOptionPress={handleOptionPress}
      />
    </SafeContainer>
  );
}
const SettingsModal = ({ modalVisible, setModalVisible, onOptionPress }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <CenteredView>
        <TouchableWithoutFeedback>
          <ModalView>
            <ScrollViewContainer>
              <SettingsText>Settings</SettingsText>
              {sections.map(({ header, items }, index) => (
                <SectionBox key={index}>
                  <SectionHeader>{header}</SectionHeader>
                  {items.map((item, idx) => (
                    <OptionPressable
                      key={idx}
                      onPress={() => onOptionPress(item.label, item.message)}
                    >
                      <ItemText>{item.label}</ItemText>
                    </OptionPressable>
                  ))}
                </SectionBox>
              ))}
            </ScrollViewContainer>
            <Pressable onPress={() => setModalVisible(false)}>
              <Button title="CLOSE" onPress={() => setModalVisible(false)} />
            </Pressable>
          </ModalView>
        </TouchableWithoutFeedback>
      </CenteredView>
    </TouchableWithoutFeedback>
  </Modal>
);

export const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

export const ButtonContainer = styled(View)`
  margin: 0px 0px;
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
  position: relative;
`;

const ProfileImage = styled.Image`
  height: 50px;
  width: 50px;
`;

const ProfileAction = styled.View`
  width: 25px;
  height: 25px;
  background-color: #007bff;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  position: left;
  right: 16px;
  bottom: -15px;
`;

const ProfileInfo = styled.View`
  flex: 1;
  margin: 20px;
  margin-top: 5px;
  flex-direction: column;
`;

const ProfileInfoModal = styled.View`
  margin: 20px;
  margin-top: 5px;
  left: -20px;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const SettingsText = styled.Text`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 10px;
`;

const Workouts = styled.Text`
  font-size: 20px;
  color: grey;
`;

const DashboardText = styled(Name)`
  margin-top: 20px;
`;

const Widget = styled(Pressable)`
  border-width: 2px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
  height: 200px;
`;

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalView = styled(View)`
  flex: 0.8;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  elevation: 2;
  width: 90%;
  height: 90%;
`;

const SectionBox = styled.View`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const SectionHeader = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ItemText = styled.Text`
  font-size: 16px;
`;

const OptionPressable = styled(Pressable)`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const ScrollViewContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export default HistoryScreen;
