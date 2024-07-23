import React, { useState, useRef } from "react";
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
import { Ionicons } from "@expo/vector-icons";
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

const Template = ({
  id,
  title,
  lastPerformed,
  content,
  onPress,
  onEdit,
  onRename,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const ellipsisRef = useRef(null);

  const daysAgo = () => {
    if (!lastPerformed) return null;
    const today = new Date();
    const performedDate = new Date(lastPerformed);
    const diffTime = Math.abs(today - performedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? null : diffDays;
  };

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

  const lastPerformedDays = daysAgo();

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <TemplateContainer>
        <TitleContainer>
          <TemplateTitle>{title}</TemplateTitle>
          <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>
        {lastPerformedDays !== null && (
          <ContentText>
            Last performed: {lastPerformedDays} days ago
          </ContentText>
        )}
        <TemplateContent>
          {content.map((item, index) => (
            <ContentText key={index}>
              {item.sets.length} x {item.name}
            </ContentText>
          ))}
        </TemplateContent>
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
              <RenameModalTitle>Rename template</RenameModalTitle>
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
      </TemplateContainer>
    </TouchableNativeFeedback>
  );
};

export const TitleContainer = styled(SafeAreaView)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default Template;
