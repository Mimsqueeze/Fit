import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
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
            <ContentText>{exercise.instructions.join("\n\n")}</ContentText>
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

export default ExerciseDetailScreen;