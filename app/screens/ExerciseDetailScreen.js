import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { Header, SubHeader, ContentText } from "../config/style";

function ExerciseDetailScreen({ route }) {
  const { exercise } = route.params;
  return (
    <SafeContainer>
      <FlexBox>
        <ScrollView>
          <Header>{exercise.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</Header>
            <Instructions>
              <ContentText>{exercise.instructions.join("\n\n")}</ContentText>
            </Instructions>
        </ScrollView>
      </FlexBox>
    </SafeContainer>
  );
}

export const FlexBox = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
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

export const Instructions = styled(View)`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

export default ExerciseDetailScreen;