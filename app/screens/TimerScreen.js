import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

const TimerScreen = () => {
  const [selectedMinutes, setSelectedMinutes] = useState(0); // MINUTES
  const [selectedSeconds, setSelectedSeconds] = useState(30); // SECONDS
  const [seconds, setSeconds] = useState(60); // CURRENT TIMER VALUE
  const [isActive, setIsActive] = useState(false); // TRACK IF TIMER HAS BEEN STARTED
  const [isCustomPickerVisible, setIsCustomPickerVisible] = useState(false); // CHECK IF TIMER SCROLLER IS ACTIVE

  // TIMER UPDATER WHEN ACTIVE
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const totalSeconds = selectedMinutes * 60 + selectedSeconds;
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, selectedMinutes, selectedSeconds]);

  // TOGGLE BETWEEN PAUSE AND START BUTTON IF TIMER IS/NOT ACTIVE
  const toggle = () => {
    setIsActive(!isActive);
  };

  // RESET THE VALUE OF THE TIMER 
  const reset = () => {
    setSeconds(selectedMinutes * 60 + selectedSeconds);
    setIsActive(false);
  };

  // SET THE PREDEFINED TIME
  const handlePredefinedTime = (timeInSeconds) => {
    setSelectedMinutes(Math.floor(timeInSeconds / 60));
    setSelectedSeconds(timeInSeconds % 60);
    setSeconds(timeInSeconds);
    setIsCustomPickerVisible(false);
  };
  // OPEN CUSTOM TIMER MENU
  const openCustomPicker = () => {
    setIsCustomPickerVisible(true);
  };

  // CLOSE CUSTOM TIMER MENU
  const closeCustomPicker = () => {
    setIsCustomPickerVisible(false);
  };

  // RENDER MINUTES IN PICKER
  const renderMinuteItems = () => {
    return Array.from({ length: 61 }, (_, i) => (
      <Picker.Item key={i} label={`${i} min`} value={i} />
    ));
  };

  // RENDER SECONDS IN PICKER
  const renderSecondItems = () => {
    return Array.from({ length: 60 }, (_, i) => (
      <Picker.Item key={i} label={`${i} sec`} value={i} />
    ));
  };

  // TIME FORMATTER
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.timerContainer}>
          {/* TOP SQUARE WITH START/PAUSE AND RESET BUTTON AS WELL AS TIMER */}
          <Button onPress={toggle} title={isActive ? 'Pause' : 'Start'} />
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          <Button onPress={reset} title="Reset" />
        </View>
      </View>

      {/* BOTTOM SQUARE FOR PREDEFINED TIME AS WELL AS CUSTOM TIME */}
      <View style={styles.box}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => handlePredefinedTime(30)} title="30 SECONDS" />
          <Button onPress={() => handlePredefinedTime(60)} title="60 SECONDS" />
          <Button onPress={openCustomPicker} title="CUSTOM" />
        </View>
      </View>

      {/* MODULE FOR WHEN CUSTOM BUTTON IS PRESSED */}
      <Modal visible={isCustomPickerVisible} animationType="slide">
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Button onPress={closeCustomPicker} title="Done" />
          </View>
          <View style={styles.pickerContainer}>
            {/* MINUTE SECTION */}
            <Picker
              selectedValue={selectedMinutes}
              onValueChange={(itemValue) => {
                setSelectedMinutes(itemValue);
                setSeconds(itemValue * 60 + selectedSeconds);
              }}
              style={styles.picker}
            >
              {renderMinuteItems()}
            </Picker>
            {/* SECOND SECTION */}
            <Picker
              selectedValue={selectedSeconds}
              onValueChange={(itemValue) => {
                setSelectedSeconds(itemValue);
                setSeconds(selectedMinutes * 60 + itemValue);
              }}
              style={styles.picker}
            >
              {renderSecondItems()}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: '80%',
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  timerText: {
    fontSize: 48,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  picker: {
    height: 200,
    width: '40%',
  },
});

export default TimerScreen;