import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CountDownAnimation = ({
  key = 1,
  timer = 1,
  animate = true,
  children,
}) => {
  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={timer * 60}
      colors={[
        ["#004777", 0.33],
        ["#F7B801", 0.33],
        ["#A30000", 0.33],
      ]}
      strokeWidth={6}
      trailColor="#D2D2D4"
      onComplete={() => {}}
    >
      {/* {children} */}
    </CountdownCircleTimer>
  );
};
