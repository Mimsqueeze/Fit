import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseItem from "../components/ExerciseItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OngoingContext } from "../contexts/OngoingWorkoutContext";
import { useFocusEffect } from "@react-navigation/native";

const WorkoutTitleInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
  flex: 1;
`;

export let saveWorkout; // Declare the saveWorkout function
export let back;

function OngoingWorkoutScreen({ route, navigation }) {
  const [id, setID] = useState(-1);
  const [lastPerformed, setLastPerformed] = useState(-1);
  const [time, setTime] = useState(-1);
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [numExercises, setNumExercises] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const ellipsisRef = useRef(null);
  const titleInputRef = useRef(null); // Ref for the WorkoutTitleInput
  const [timeStarted, setTimeStarted] = useState(Date.now());

  const { ongoing, ongoingWorkout, updateOngoing } = useContext(OngoingContext);

  useEffect(() => {
    if (route.params?.template) {
      const { template } = route.params;
      if (template.title === "") {
        const fetchWorkouts = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem("@workoutData");
            if (jsonValue != null) {
              setTitle("Workout #" + (JSON.parse(jsonValue).length + 1));
            }
          } catch (e) {
            console.error(e);
          }
        };

        fetchWorkouts();
      } else {
        setTitle(template.title);
      }
      setExercises(template.content);
      setNumExercises(template.content.length);
    } else if (route.params?.selectedExercise) {
      const selectedExercise = route.params.selectedExercise;
      setExercises([...exercises, selectedExercise]);
      setNumExercises(numExercises);
    } else if (route.params?.workout) {
      const workout = route.params.workout;
      setID(workout.id);
      setLastPerformed(workout.lastPerformed);
      setTime(workout.time);
      setTitle(workout.title);
      setExercises(workout.content);
      setNumExercises(workout.content.length);
    } else if (route.params?.ongoing) {
      const workout = route.params.ongoing;
      setID(workout.id);
      setLastPerformed(workout.lastPerformed);
      setTime(workout.time);
      setTitle(workout.title);
      setExercises(workout.content);
      setTimeStarted(workout.timeStarted);
      setNumExercises(workout.content.length);
    } else {
      const fetchWorkouts = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@workoutData");
          if (jsonValue != null) {
            setTitle("Workout #" + (JSON.parse(jsonValue).length + 1));
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchWorkouts();
    }
  }, [route.params?.template, route.params?.selectedExercise]);

  const addExercise = () => {
    navigation.navigate("ExerciseSelectionScreen", { fromWorkout: true });
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleUpdateSets = (index, updatedSets) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets = updatedSets;
    setExercises(updatedExercises);
  };

  back = async () => {
    updateOngoing(true, {
      id: id,
      title: title,
      content: exercises,
      lastPerformed: lastPerformed,
      time: time,
      timeStarted: timeStarted,
    });
    navigation.navigate(" History ");
  };

  saveWorkout = async () => {
    console.log(exercises);

    try {
      // Fetch existing exercise data
      const jsonValue = await AsyncStorage.getItem("@exerciseData");
      const exerciseData = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Update the `previous` field for matching exercises
      const updatedExerciseData = exerciseData.map((exercise) => {
        // Find the exercise in `exercises` to update
        const updatedExercise = exercises.find(
          (ex) => ex.name === exercise.name
        );
        if (updatedExercise) {
          return {
            ...exercise,
            previous: updatedExercise.sets.map((set) => ({
              lbs: set.lbs || "",
              reps: set.reps || "",
              rir: set.rir || "",
              type: set.type || "working",
            })),
          };
        }
        return exercise;
      });

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem(
        "@exerciseData",
        JSON.stringify(updatedExerciseData)
      );
      console.log(updatedExerciseData);

      // Save workout data
      const workoutJsonValue = await AsyncStorage.getItem("@workoutData");
      const workouts =
        workoutJsonValue != null ? JSON.parse(workoutJsonValue) : [];

      const newWorkout = {
        id: id !== -1 ? id : Date.now(),
        title: title,
        content: exercises,
        lastPerformed: id !== -1 ? lastPerformed : Date.now(),
        time: id !== -1 ? time : (Date.now() - timeStarted) / 1000,
      };

      const updatedWorkouts =
        id !== -1
          ? workouts.map((workout) =>
              workout.id === newWorkout.id ? newWorkout : workout
            )
          : [...workouts, newWorkout];

      await AsyncStorage.setItem(
        "@workoutData",
        JSON.stringify(updatedWorkouts)
      );

      navigation.navigate(" History ");
    } catch (e) {
      console.error(e);
    }

    updateOngoing(false, null);
  };

  const showMenu = () => {
    ellipsisRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - 100, y: py - 20 });
      setMenuVisible(true);
    });
  };

  const handleRename = () => {
    setMenuVisible(false);
    setTimeout(() => {
      titleInputRef.current.focus(); // Focus the input after modal is opened
    }, 100); // Small delay to ensure the modal is fully open
  };

  return (
    <SafeContainer>
      <ScrollView>
        <TitleContainer>
          <WorkoutTitleInput
            ref={titleInputRef} // Attach the ref
            value={title}
            onChangeText={setTitle}
            placeholder="Enter workout name"
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <TouchableOpacity ref={ellipsisRef} onPress={showMenu}>
            <Ionicons name="ellipsis-vertical" size={20} color="#2296f3" />
          </TouchableOpacity>
        </TitleContainer>
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onUpdateSets={(updatedSets) => handleUpdateSets(index, updatedSets)}
            onRemoveExercise={() => handleRemoveExercise(index)}
          />
        ))}
        <ButtonContainer>
          <Button title="ADD EXERCISE" onPress={addExercise} />
        </ButtonContainer>
      </ScrollView>
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
            <MenuItem onPress={handleRename}>
              <MenuText>Rename</MenuText>
            </MenuItem>
          </MenuContainer>
        </TouchableOpacity>
      </Modal>
    </SafeContainer>
  );
}

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

const TitleContainer = styled(SafeAreaView)`
  margin-top: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  margin: 3px 15px;
  justify-content: space-between;
  flex-direction: column;
`;

const ButtonContainer = styled(View)`
  margin: 8px 0px;
`;

export default OngoingWorkoutScreen;
