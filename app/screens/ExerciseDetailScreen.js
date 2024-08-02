import { React, useState, useRef } from "react";
import { View, Text } from "react-native";

import styled from "styled-components/native";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { Header, SubHeader, ContentText } from "../config/style";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let saveExercise; // Declare the saveExercise function
function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const id = exercise.id;
  const [name, setName] = useState(
    exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    )
  );
  const [instructions, setInstructions] = useState(exercise.instructions);
  const [muscles, setMuscles] = useState(exercise.muscles);

  const ellipsisRef = useRef(null);
  const nameInputRef = useRef(null); // Ref for the WorkoutTitleInput

  const handleRename = () => {
    setMenuVisible(false);
    setTimeout(() => {
      nameInputRef.current.focus(); // Focus the input after modal is opened
    }, 100); // Small delay to ensure the modal is fully open
  };
  const showMenu = () => {
    ellipsisRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 100, y: py - 20 });
      setMenuVisible(true);
    });
  };

  saveExercise = async () => {
    try {
      const newExercise = {
        id: id,
        name: name,
        muscles: muscles,
        instructions: instructions,
      };
      const jsonValue = await AsyncStorage.getItem("@exerciseData");
      const exercises = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (route.params?.exercise) {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === newExercise.id ? newExercise : exercise
        );
        await AsyncStorage.setItem(
          "@exerciseData",
          JSON.stringify(updatedExercises)
        );
      } else {
        exercises.push(newExercise);
        await AsyncStorage.setItem("@exerciseData", JSON.stringify(exercises));
      }

      navigation.goBack(); // Navigate back after saving
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeContainer>
      <FlexBox>
        <ScrollView>
          <NameContainer>
            <ExerciseNameInput
              ref={nameInputRef} // Attach the ref
              value={name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
              onChangeText={setName}
              placeholder="Enter exercise name"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
              <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
            </TouchableOpacity>
          </NameContainer>
          <SubHeader>TARGET MUSCLES</SubHeader>
          <ContentBox>
            <ContentTextInput
              value={muscles.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
              onChangeText={setMuscles}
              placeholder="Enter muscle categories"
              numberOfLines={1}
              ellipsizeMode="tail"
            ></ContentTextInput>
          </ContentBox>
          <SubHeader>INSTRUCTIONS</SubHeader>
          <ContentBox>
            <ContentTextInput
              value={instructions}
              onChangeText={setInstructions}
              placeholder="Enter instructions (optional)"
              numberOfLines={1}
              ellipsizeMode="none"
            ></ContentTextInput>
          </ContentBox>
        </ScrollView>
      </FlexBox>
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
        animationType="fade"
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0}
          onPress={() => setMenuVisible(false)}
        >
          <MenuContainer
            style={{
              top: menuPosition.y,
              left: menuPosition.x,
            }}
          >
            <MenuItem onPress={handleRename}>
              <MenuText>Rename</MenuText>
            </MenuItem>
          </MenuContainer>
        </TouchableOpacity>
      </Modal>
    </SafeContainer>
  );
}

export const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;
const MenuItem = styled.TouchableOpacity`
  padding-vertical: 5px;
  padding-horizontal: 15px;
`;
const MenuText = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

export const NameContainer = styled(SafeAreaView)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const MenuContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  width: 30%;
`;

export const ContentBox = styled(View)`
  background-color: #fff;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const ExerciseNameInput = styled.TextInput`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

export const ContentTextInput = styled.TextInput`
  font-size: 14px;
  color: #666;
  font-weight: bold;
`;

export default ExerciseDetailScreen;
