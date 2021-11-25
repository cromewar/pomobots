import "../styles/Pomodoro.css";
import { SetPomodoro } from "./pomodoro/SetPomodoro";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { SettingContext } from "../context/SettingsContext";
import { PomoButton } from "./pomodoro/PomoButton";
import { CountDownAnimation } from "./pomodoro/CountDownAnimation";

export const Main = () => {
  const {
    pomodoro,
    executing,
    setCurrentTimer,
    SettingBtn,
    children,
    startAnimate,
    startPomodoro,
    pausePomodoro,
    updateExecute,
  } = useContext(SettingContext);

  useEffect(() => updateExecute(executing), [executing, startAnimate]);
  return (
    <Box className="container">
      <h2> Earn NFT's being productive!</h2>
      <h3> get ready to focus</h3>
      {pomodoro === 0 ? (
        <SetPomodoro />
      ) : (
        <>
          <ul className="labels">
            <li>
              <PomoButton
                title="Work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <PomoButton
                title="Short Break"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <PomoButton
                title="Long Break"
                activeClass={
                  executing.active === "long" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <div className="time-container">
            <div className="time-wrapper">
              <CountDownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
              >
                {children}
              </CountDownAnimation>
            </div>
          </div>
          <div>
            <ul className="labels">
              <li>
                <PomoButton
                  title="Start"
                  activeClass={startAnimate ? "active-label" : undefined}
                  _callback={startPomodoro}
                />
              </li>
              <li>
                <PomoButton
                  title="Stop"
                  activeClass={!startAnimate ? "active-label" : undefined}
                  _callback={pausePomodoro}
                />
              </li>
            </ul>
          </div>
          <PomoButton title="Settings" _callback={SettingBtn} />
        </>
      )}
      {/* <CountDownAnimation /> */}
    </Box>
  );
};
