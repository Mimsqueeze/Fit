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

const MovementContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 3;
`;

const MovementName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Movement = ({ name, sets, muscles }) => {
  return (
    <TouchableNativeFeedback>
      <MovementContainer>
        <MovementName>
          {sets} x {name}
        </MovementName>
        <ContentText>{muscles.join(", ")}</ContentText>
      </MovementContainer>
    </TouchableNativeFeedback>
  );
};

export default Movement;
