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
import TemplateMovement from "../components/TemplateMovement";

function TemplateDetailScreen({ route }) {
  const { workout } = route.params;
  return (
    <SafeContainer>
      <FlexBox>
        <ScrollView>
          <Header>{workout.title}</Header>
          <ContentText>
            Last performed: {daysAgo(workout.lastPerformed)} days ago
          </ContentText>
          {workout.content.map((movement, index) => (
            <TemplateMovement
              key={index}
              name={movement.name}
              numSets={movement.numSets}
              muscles={movement.muscles}
            />
          ))}
        </ScrollView>
        <ButtonContainer>
          <Button title="START WORKOUT" />
        </ButtonContainer>
      </FlexBox>
    </SafeContainer>
  );
}

const daysAgo = (lastPerformed) => {
  const today = new Date();
  const performedDate = new Date(lastPerformed);
  const diffTime = Math.abs(today - performedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

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

export default TemplateDetailScreen;