import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseItem from "../components/ExerciseItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TemplateTitleInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

export let saveTemplate; // Declare the saveTemplate function

function CreateTemplateScreen({ route, navigation }) {
  const [title, setTitle] = useState("New Workout Template");
  const [exercises, setExercises] = useState([]);
  const [numExercises, setNumExercises] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const ellipsisRef = useRef(null);
  const titleInputRef = useRef(null); // Ref for the TemplateTitleInput

  useEffect(() => {
    if (route.params?.template) {
      const { template } = route.params;
      setTitle(template.title);
      setExercises(template.content);
      setNumExercises(template.content.length + 1);
    }
    if (route.params?.selectedExercise) {
      const selectedExercise = route.params.selectedExercise;
      setExercises([...exercises, selectedExercise]);
      setNumExercises(numExercises + 1);
    }
  }, [route.params?.template, route.params?.selectedExercise]);

  const addExercise = () => {
    navigation.navigate("ExerciseSelectionScreen", { fromTemplate: true });
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleUpdateSets = (index, updatedSets) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets = updatedSets;
    setExercises(updatedExercises);
  };

  saveTemplate = async () => {
    try {
      const newTemplate = {
        id: route.params?.template ? route.params.template.id : Date.now(),
        title,
        content: exercises,
      };
      const jsonValue = await AsyncStorage.getItem("@templateData");
      const templates = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (route.params?.template) {
        const updatedTemplates = templates.map((template) =>
          template.id === newTemplate.id ? newTemplate : template
        );
        await AsyncStorage.setItem(
          "@templateData",
          JSON.stringify(updatedTemplates)
        );
      } else {
        templates.push(newTemplate);
        await AsyncStorage.setItem("@templateData", JSON.stringify(templates));
      }

      navigation.goBack(); // Navigate back after saving
    } catch (e) {
      console.error(e);
    }
  };

  const showMenu = () => {
    ellipsisRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 100, y: py - 20 });
      setMenuVisible(true);
    });
  };

  const handleRename = () => {
    setMenuVisible(false);
    setTimeout(() => {
      titleInputRef.current.focus(); // Focus the input after modal is opened
    }, 100); // Small delay to ensure the modal is fully open
  };

  return (
    <SafeContainer>
      <ScrollView>
        <TitleContainer>
          <TemplateTitleInput
            ref={titleInputRef} // Attach the ref
            value={title}
            onChangeText={setTitle}
            placeholder="Enter template name"
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onUpdateSets={(updatedSets) => handleUpdateSets(index, updatedSets)}
            onRemoveExercise={() => handleRemoveExercise(index)}
          />
        ))}
        <ButtonContainer>
          <Button title="ADD EXERCISE" onPress={addExercise} />
        </ButtonContainer>
      </ScrollView>
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

const MenuItem = styled.TouchableOpacity`
  padding-vertical: 5px;
  padding-horizontal: 15px;
`;

const MenuText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const RenameModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const RenameModalContent = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
`;

const RenameModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TitleContainer = styled(SafeAreaView)`
  margin-top: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  margin: 3px 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export default CreateTemplateScreen;
