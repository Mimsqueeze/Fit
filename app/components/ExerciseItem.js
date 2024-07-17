import React, { useState } from "react";
import { View, TextInput, TouchableNativeFeedback, Button } from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";

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
  font-size: ${({ fontSize }) =>
    fontSize || 12}px; /* Default font size is 12 */
  font-weight: bold;
  color: ${({ color }) => color || "#000"}; /* Default color is black */
  background-color: ${({ isPrevious, isSet }) =>
    isPrevious || isSet
      ? "transparent"
      : "#f0f0f0"}; /* Conditionally set background */
  border: ${({ isPrevious }) =>
    isPrevious ? "0px" : "1px solid #ccc"}; /* Conditionally set border */
  margin: 0px 3px;
  border-radius: 4px; /* Rounded corners */
`;

const ExerciseItem = ({ name, numSets, sets, muscles }) => {
  const [editableSets, setEditableSets] = useState(sets);

  const handleLbsChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...editableSets[index], lbs: value };
    setEditableSets(updatedSets);
  };

  const handleRepsChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...editableSets[index], reps: value };
    setEditableSets(updatedSets);
  };

  const handleRirChange = (index, value) => {
    const updatedSets = [...editableSets];
    updatedSets[index] = { ...editableSets[index], rir: value };
    setEditableSets(updatedSets);
  };

  const addSet = () => {
    const newSet = {
      type: "working", // Example default type
      lbs: "", // Initial value for lbs
      reps: "", // Initial value for reps
      rir: "", // Initial value for rir
    };
    setEditableSets([...editableSets, newSet]);
  };

  return (
    <TouchableNativeFeedback>
      <ExerciseItemContainer>
        <ExerciseItemName>{name}</ExerciseItemName>
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
                color="#2296f3" // Example of passing color prop
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
                color="#666" // Example of passing color prop
                isPrevious // Set flag to conditionally style
              />
            </Column>
            <Column flex={2}>
              <EditableTextInput
                value={set.lbs.toString()}
                onChangeText={(value) => handleLbsChange(index, value)}
                keyboardType="numeric"
                fontSize={16}
                backgroundColor="#f0f0f0" // Example of passing background color prop
              />
            </Column>
            <Column flex={2}>
              <EditableTextInput
                value={set.reps.toString()}
                onChangeText={(value) => handleRepsChange(index, value)}
                keyboardType="numeric"
                fontSize={16}
                backgroundColor="#f0f0f0" // Example of passing background color prop
              />
            </Column>
            <Column flex={1}>
              <EditableTextInput
                value={set.rir.toString()}
                onChangeText={(value) => handleRirChange(index, value)}
                keyboardType="numeric"
                fontSize={16}
                backgroundColor="#f0f0f0" // Example of passing background color prop
              />
            </Column>
          </SetRow>
        ))}
        <ButtonContainer>
          <Button title="Add Set" onPress={addSet} />
        </ButtonContainer>
      </ExerciseItemContainer>
    </TouchableNativeFeedback>
  );
};

export const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export default ExerciseItem;
