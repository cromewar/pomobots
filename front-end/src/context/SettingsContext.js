import React, { createContext, useState } from "react";

export const SettingContext = createContext();

const SettingsContextProvider = (props) => {
  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);

  function setCurrentTimer(active_state) {
    updateExecute({
      ...executing,
      active: active_state,
    });
    setTimerTime(executing);
  }

  function startPomodoro() {
    setStartAnimate(true);
  }

  function pausePomodoro() {
    setStartAnimate(false);
  }

  function stopPomodoro() {
    setStartAnimate(false);
  }

  const SettingBtn = () => {
    setExecuting({});
    setPomodoro(0);
  };

  const updateExecute = (updatedSettings) => {
    setExecuting(updatedSettings);
    setTimerTime(updatedSettings);
  };

  const setTimerTime = (evaluate) => {
    switch (evaluate.active) {
      case "work":
        setPomodoro(evaluate.work);
        break;
      case "short":
        setPomodoro(evaluate.short);
        break;
      case "long":
        setPomodoro(evaluate.long);
        break;
      default:
        setPomodoro(0);
        break;
    }
  };

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <SettingContext.Provider
      value={{
        stopPomodoro,
        pomodoro,
        executing,
        startAnimate,
        startPomodoro,
        pausePomodoro,
        SettingBtn,
        setCurrentTimer,
        updateExecute,
        children,
      }}
    >
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingsContextProvider;
