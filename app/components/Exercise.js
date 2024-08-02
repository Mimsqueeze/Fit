import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Button,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";
import { Ionicons } from "@expo/vector-icons";

const ExerciseContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ExerciseText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-top: 8px;
`;

const Exercise = ({ exercise, onPress, onEdit, onRename, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [renameVisible, setRenameVisible] = useState(false);
  const [newName, setNewName] = useState(exercise.name);
  const ellipsisRef = useRef(null);

  const handleRename = () => {
    setNewName(exercise.name);
    setRenameVisible(true);
    setMenuVisible(false);
  };

  const handleRenameConfirm = () => {
    setRenameVisible(false);
    onRename(exercise.id, newName);
  };

  const showMenu = () => {
    ellipsisRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 100, y: py - 20 });
      setMenuVisible(true);
    });
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <ExerciseContainer>
        <TitleContainer>
          <ExerciseTitle>
            {exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </ExerciseTitle>
          <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>

        <ContentText>
          {exercise.muscles.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )}
        </ContentText>
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
              <MenuItem
                onPress={() => {
                  setMenuVisible(false);
                  onEdit(exercise.id); // Pass the ID to onEdit
                }}
              >
                <MenuText>Edit</MenuText>
              </MenuItem>
              <MenuItem onPress={handleRename}>
                <MenuText>Rename</MenuText>
              </MenuItem>
              <MenuItem
                onPress={() => {
                  setMenuVisible(false);
                  onDelete(exercise.id);
                }}
              >
                <MenuText>Delete</MenuText>
              </MenuItem>
            </MenuContainer>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent={true}
          visible={renameVisible}
          onRequestClose={() => setRenameVisible(false)}
          animationType="fade"
        >
          <RenameModalContainer>
            <RenameModalContent>
              <RenameModalTitle>Rename exercise</RenameModalTitle>
              <TextInput
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 4,
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginVertical: 15,
                  width: "100%",
                  padding: 0,
                }}
                value={newName}
                onChangeText={setNewName}
                placeholder="Enter new Name"
              />
              <ButtonContainer>
                <Button
                  title="CANCEL"
                  onPress={() => setRenameVisible(false)}
                />
                <Button title="OK" onPress={handleRenameConfirm} />
              </ButtonContainer>
            </RenameModalContent>
          </RenameModalContainer>
        </Modal>
      </ExerciseContainer>
    </TouchableNativeFeedback>
  );
};

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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled(SafeAreaView)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default Exercise;
