import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const ExerciseItemContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const ExerciseItemName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #2296f3;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const SetRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const ColumnText = styled.Text`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

const Column = styled.View`
  flex: ${({ flex }) => flex || 1}; /* Default flex value is 1 */
`;

const EditableTextInput = styled.TextInput`
  text-align: center;
  font-size: ${({ fontSize }) => fontSize || 12}px;
  font-weight: bold;
  color: ${({ color }) => color || "#000"};
  background-color: ${({ isPrevious, isSet }) =>
    isPrevious || isSet ? "transparent" : "#f0f0f0"};
  border: ${({ isPrevious }) => (isPrevious ? "0px" : "1px solid #ccc")};
  margin: 0px 3px;
  border-radius: 4px;
`;

const TitleContainer = styled(SafeAreaView)`
  margin-top: 8px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ExerciseItem = ({ exercise, onUpdateSets, onRemoveExercise }) => {
  const name = exercise.name;
  const [editableSets, setEditableSets] = useState(exercise.sets);

  const handleLbsChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...updatedSets[index], lbs: value };
    setEditableSets(updatedSets);
    onUpdateSets(updatedSets); // Update parent state
  };

  const handleRepsChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...updatedSets[index], reps: value };
    setEditableSets(updatedSets);
    onUpdateSets(updatedSets); // Update parent state
  };

  const handleRirChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...updatedSets[index], rir: value };
    setEditableSets(updatedSets);
    onUpdateSets(updatedSets); // Update parent state
  };

  const addSet = () => {
    const newSet = {
      type: "working",
      lbs: "",
      reps: "",
      rir: "",
    };
    setEditableSets([...editableSets, newSet]);
    onUpdateSets([...editableSets, newSet]); // Update parent state
  };

  const removeSet = () => {
    if (editableSets.length > 0) {
      setEditableSets(editableSets.slice(0, -1));
      onUpdateSets(editableSets.slice(0, -1)); // Update parent state
    }
  };

  return (
    <ExerciseItemContainer>
      <TitleContainer>
        <ExerciseItemName>{name}</ExerciseItemName>
        <TouchableOpacity onPress={onRemoveExercise}>
          <Ionicons name="trash-outline" size={20} color="#2296f3" />
        </TouchableOpacity>
      </TitleContainer>
      <HeaderRow>
        <Column flex={1}>
          <ColumnText>SET</ColumnText>
        </Column>
        <Column flex={2}>
          <ColumnText>PREVIOUS</ColumnText>
        </Column>
        <Column flex={2}>
          <ColumnText>LBS</ColumnText>
        </Column>
        <Column flex={2}>
          <ColumnText>REPS</ColumnText>
        </Column>
        <Column flex={1}>
          <ColumnText>RIR</ColumnText>
        </Column>
      </HeaderRow>
      {editableSets.map((set, index) => (
        <SetRow key={index}>
          <Column flex={1}>
            <EditableTextInput
              value={
                set.type === "warmup"
                  ? "W"
                  : set.type === "working"
                  ? (index + 1).toString()
                  : "D"
              }
              editable={false}
              fontSize={14}
              color="#2296f3"
              isSet
            />
          </Column>
          <Column flex={2}>
            <EditableTextInput
              value={
                set.previous
                  ? `${set.previous.lbs} lbs × ${set.previous.reps}`
                  : "N/A"
              }
              editable={false}
              fontSize={14}
              color="#666"
              isPrevious
            />
          </Column>
          <Column flex={2}>
            <EditableTextInput
              value={set.lbs.toString()}
              onChangeText={(value) => handleLbsChange(index, value)}
              keyboardType="numeric"
              fontSize={16}
              backgroundColor="#f0f0f0"
            />
          </Column>
          <Column flex={2}>
            <EditableTextInput
              value={set.reps.toString()}
              onChangeText={(value) => handleRepsChange(index, value)}
              keyboardType="numeric"
              fontSize={16}
              backgroundColor="#f0f0f0"
            />
          </Column>
          <Column flex={1}>
            <EditableTextInput
              value={set.rir.toString()}
              onChangeText={(value) => handleRirChange(index, value)}
              keyboardType="numeric"
              fontSize={16}
              backgroundColor="#f0f0f0"
            />
          </Column>
        </SetRow>
      ))}
      <ButtonRow>
        <ButtonContainer>
          <Button title="Remove Set" onPress={removeSet} />
        </ButtonContainer>
        <ButtonContainer>
          <Button title="Add Set" onPress={addSet} />
        </ButtonContainer>
      </ButtonRow>
    </ExerciseItemContainer>
  );
};

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled(View)`
  flex: 1;
  margin: 8px 4px;
`;

export default ExerciseItem;
