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

const TemplateMovementContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const TemplateMovementName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TemplateMovement = ({ name, sets, muscles }) => {
  return (
    <TouchableNativeFeedback>
      <TemplateMovementContainer>
        <TemplateMovementName>
          {sets.length} x {name}
        </TemplateMovementName>
        <ContentText>{muscles.join(", ")}</ContentText>
      </TemplateMovementContainer>
    </TouchableNativeFeedback>
  );
};

export default TemplateMovement;
