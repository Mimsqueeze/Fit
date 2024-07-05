import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableNativeFeedback,
  View,
  Button,
  Alert,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

function ProfileScreen(props) {
  return (
    <SafeAreaView style = {[styles.container]}>
      <ScrollView>
      <Text style = {[styles.heading]}>
        Profile
      </Text>
      <Pressable style = {styles.profileContainer} title = "Profile Edit">
        <Image style = {styles.pfp} source = {require('../assets/sample.png')}></Image>
        <View style = {styles.profileInfo}>
          <Text style = {styles.name}>Name</Text>
          <Text style = {styles.workouts}># of workouts</Text>
        </View>
      </Pressable>
      <Text style = {styles.name}>Dashboard</Text>
      <Pressable style = {styles.widget}>
        <Text style = {styles.name}>Workouts Per Week</Text>
        <Text style = {styles.workouts}>Activity</Text>
      </Pressable>
      <Pressable style = {styles.widget}>
        <Text style = {styles.name}>Weight</Text>
        <Text style = {styles.workouts}>Absolute</Text>
      </Pressable> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  profileContainer: {
    flex: 1,
    margin: 30,
    flexDirection: 'row',
  },

  pfp: {
    height: 50,
    width: 50,
  },

  profileInfo: {
    flex: 1,
    margin: 20,
    marginTop: 5,
    flexDirection: 'column',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  workouts: {
    fontSize: 20,
    color: 'grey',
  },

  widget: {
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    height: 200,
  }
});

export default ProfileScreen;
