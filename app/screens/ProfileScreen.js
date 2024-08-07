import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  Modal,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Header } from "../config/style";

const widgets = [
  { name: "Workouts Per Week", description: "Activity" },
  { name: "Weight", description: "Absolute" },
  { name: "Personal Records", description: "Best Weights" },
];

const sections = [
  {
    header: "Preferences",
    items: [
      { label: "Language", message: "We currently only support English" },
      {
        label: "Measurement",
        message: "We currently only support metric system",
      },
      { label: "Theme", message: "We currently only support one theme" },
    ],
  },
  {
    header: "Help",
    items: [
      {
        label: "FAQ",
        message: "Q. Where can I find support? \nA. You can find support below",
      },
      {
        label: "Support",
        message:
          "For support, please contact us at support@example.com or call us at 123-456-7890.",
      },
    ],
  },
  {
    header: "Contact",
    items: [
      { label: "Email Us", message: "You can Email us at support@example.com" },
      { label: "Call Us", message: "You can call us at 123-456-7890" },
    ],
  },
];

function ProfileScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (label, message) => {
    if (message) {
      Alert.alert(label, message);
    } else {
      Alert.alert(`Pressed: ${label}`);
    }
  };

  return (
    <SafeContainer>
      <TopBar>
        <Header>Profile</Header>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </TopBar>
      <ScrollView>
        <ProfileSection />
        <DashboardText>Dashboard</DashboardText>
        {widgets.map((widget, index) => (
          <Widget key={index}>
            <Name>{widget.name}</Name>
            <Workouts>{widget.description}</Workouts>
          </Widget>
        ))}
      </ScrollView>
      <SettingsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onOptionPress={handleOptionPress}
      />
    </SafeContainer>
  );
}

const ProfileSection = () => (
  <ProfilePressable>
    <ProfileImage source={require("../assets/sample.png")} />
    <ProfileInfo>
      <Name>Name</Name>
      <Workouts># of workouts</Workouts>
    </ProfileInfo>
  </ProfilePressable>
);

const SettingsModal = ({ modalVisible, setModalVisible, onOptionPress }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
    <CenteredView>
      <ModalView>
        <ScrollViewContainer>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <ProfilePressable>
              <ProfileImage source={require("../assets/sample.png")} />
              <ProfileAction>
                <FeatherIcon name="edit-3" size={15} color="#fff" />
              </ProfileAction>
            </ProfilePressable>
          </TouchableOpacity>

          <ProfileInfoModal>
            <Name>Name</Name>
          </ProfileInfoModal>

          {sections.map(({ header, items }, index) => (
            <SectionBox key={index}>
              <SectionHeader>{header}</SectionHeader>
              {items.map((item, idx) => (
                <OptionPressable
                  key={idx}
                  onPress={() => onOptionPress(item.label, item.message)}
                >
                  <ItemText>{item.label}</ItemText>
                </OptionPressable>
              ))}
            </SectionBox>
          ))}
        </ScrollViewContainer>

        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
      </ModalView>
    </CenteredView>
  </Modal>
);

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
  position: relative;
`;

const ProfileImage = styled.Image`
  height: 50px;
  width: 50px;
`;

const ProfileAction = styled.View`
  width: 25px;
  height: 25px;
  background-color: #007bff;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  position: left;
  right: 16px;
  bottom: -15px;
`;

const ProfileInfo = styled.View`
  flex: 1;
  margin: 20px;
  margin-top: 5px;
  flex-direction: column;
`;

const ProfileInfoModal = styled.View`
  margin: 20px;
  margin-top: 5px;
  left: -20px;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const Workouts = styled.Text`
  font-size: 20px;
  color: grey;
`;

const DashboardText = styled(Name)`
  margin-top: 20px;
`;

const Widget = styled(Pressable)`
  border-width: 2px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
  height: 200px;
`;

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled(View)`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  width: 90%;
  height: 90%;
`;

const SectionBox = styled.View`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #f0f0f0;
  border-radius: 2px;
  border: 1px solid #ddd;
`;

const SectionHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ItemText = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const OptionPressable = styled(Pressable)`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const ScrollViewContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export default ProfileScreen;
