import { React, useRef, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  View,
  Text,
  TouchableNativeFeedback,
  Button,
} from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";
import { Ionicons } from "@expo/vector-icons";

const WorkoutContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const WorkoutTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const WorkoutContent = styled.View`
  margin-top: 4px;
`;

const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const TimeContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
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

export const ExerciseText = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-top: 8px;
`;

const Workout = ({ workout, onPress, onEdit, onRename, onDelete }) => {
  const id = workout.id;
  const title = workout.title;
  const lastPerformed = workout.lastPerformed;
  const time = workout.time;
  const content = workout.content;
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const ellipsisRef = useRef(null);

  // Calculate how many days ago the Workout was performed
  const formatDate = () => {
    const date = new Date(lastPerformed);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  function formatTime() {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    let formattedTime = "";
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0 || hours === 0) {
      formattedTime += `${minutes}m`;
    }
    return formattedTime.trim();
  }

  function bestSet(item) {
    const sets = item.sets;
    if (sets.length === 0) return null;

    // Initialize the best set as the first one
    let bestSet = sets[0];
    let maxWeight = bestSet.lbs * bestSet.reps;

    // Iterate over the sets to find the one with the highest total weight
    for (let i = 1; i < sets.length; i++) {
      const totalWeight = sets[i].lbs * sets[i].reps;
      if (totalWeight > maxWeight) {
        bestSet = sets[i];
        maxWeight = totalWeight;
      }
    }

    return bestSet.lbs + " lbs x " + bestSet.reps;
  }

  const showMenu = () => {
    ellipsisRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 100, y: py - 20 });
      setMenuVisible(true);
    });
  };

  const handleRename = () => {
    setRenameVisible(true);
    setMenuVisible(false);
  };

  const handleRenameConfirm = () => {
    setRenameVisible(false);
    onRename(id, newTitle);
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <WorkoutContainer>
        <TitleContainer>
          <WorkoutTitle>{title}</WorkoutTitle>
          <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>
        <FlexBox>
          <ContentText>{formatDate()}</ContentText>
          <TimeContainer>
            <Ionicons name="time-outline" size={20} color="#666" />
            <ContentText>{formatTime()}</ContentText>
          </TimeContainer>
        </FlexBox>
        <FlexBox>
          <ExerciseText>Exercise</ExerciseText>
          <ExerciseText>Best set</ExerciseText>
        </FlexBox>
        {content.map((item, index) => (
          <FlexBox key={index}>
            <ContentText>
              {item.sets.length} x {item.name}
            </ContentText>
            <ContentText>{bestSet(item)}</ContentText>
          </FlexBox>
        ))}
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
                  onEdit(id); // Pass the ID to onEdit
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
                  onDelete(id);
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
              <RenameModalTitle>Rename workout</RenameModalTitle>
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
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Enter new title"
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
      </WorkoutContainer>
    </TouchableNativeFeedback>
  );
};

export const TitleContainer = styled(SafeAreaView)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default Workout;
