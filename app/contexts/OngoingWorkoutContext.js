import React, { createContext, useState } from "react";

export const OngoingContext = createContext();

const OngoingContextProvider = ({ children }) => {
  const [ongoing, setOngoing] = useState(false);
  const [ongoingWorkout, setOngoingWorkout] = useState(null);

  const updateOngoing = (ongoing, workout) => {
    setOngoing(ongoing);
    setOngoingWorkout(workout);
  };

  return (
    <OngoingContext.Provider value={{ ongoing, ongoingWorkout, updateOngoing }}>
      {children}
    </OngoingContext.Provider>
  );
};

export default OngoingContextProvider;
