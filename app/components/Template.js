import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Header, SubHeader, ContentText } from "../config/style";

const TemplateContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const TemplateTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TemplateContent = styled.View`
  margin-top: 8px;
`;

const Template = ({ title, lastPerformed, content, onPress }) => {
  // Calculate how many days ago the Template was performed
  const daysAgo = () => {
    const today = new Date();
    const performedDate = new Date(lastPerformed);
    const diffTime = Math.abs(today - performedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <TemplateContainer>
        <TemplateTitle>{title}</TemplateTitle>
        <ContentText>Last performed: {daysAgo()} days ago</ContentText>
        <TemplateContent>
          {content.map((item, index) => (
            <ContentText key={index}>
              {item.numSets} x {item.name}
            </ContentText>
          ))}
        </TemplateContent>
      </TemplateContainer>
    </TouchableNativeFeedback>
  );
};

export default Template;
