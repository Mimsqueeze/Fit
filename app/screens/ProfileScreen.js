import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import styled from "styled-components/native";

function ProfileScreen(props) {
  return (
    <SafeContainer>
      <ScrollView>
        <Heading>Profile</Heading>
        <ProfilePressable>
          <ProfileImage source={require("../assets/sample.png")} />
          <ProfileInfo>
            <Name>Name</Name>
            <Workouts># of workouts</Workouts>
          </ProfileInfo>
        </ProfilePressable>
        <DashboardText>Dashboard</DashboardText>
        <Widget>
          <Name>Workouts Per Week</Name>
          <Workouts>Activity</Workouts>
        </Widget>
        <Widget>
          <Name>Weight</Name>
          <Workouts>Absolute</Workouts>
        </Widget>
      </ScrollView>
    </SafeContainer>
  );
}

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  margin: 10px;
  justify-content: space-between;
  flex-direction: column;
`;

const Heading = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
`;

const ProfilePressable = styled(Pressable)`
  flex: 1;
  margin: 30px;
  flex-direction: row;
`;

const ProfileImage = styled(Image)`
  height: 50px;
  width: 50px;
`;

const ProfileInfo = styled.View`
  flex: 1;
  margin: 20px;
  margin-top: 5px;
  flex-direction: column;
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

export default ProfileScreen;
