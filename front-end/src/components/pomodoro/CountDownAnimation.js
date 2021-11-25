import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useContext } from "react";
import { SettingContext } from "../../context/SettingsContext";

export const CountDownAnimation = ({
  key = 1,
  timer = 1,
  animate = true,
  children,
}) => {
  const { stopPomodoro } = useContext(SettingContext);

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={timer * 60}
      colors={[
        // ["#004777", 0.33],
        // ["#F7B801", 0.33],
        ["#7b1fa2", 1],
      ]}
      strokeWidth={6}
      trailColor="#D2D2D4"
      onComplete={() => {
        stopPomodoro();
      }}
    >
      {children}
    </CountdownCircleTimer>
  );
};
