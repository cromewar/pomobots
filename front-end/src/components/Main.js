import "../styles/Pomodoro.css";
import { SetPomodoro } from "./pomodoro/SetPomodoro";
import { CountDownAnimation } from "./pomodoro/CountDownAnimation";
import { Box } from "@mui/material";

export const Main = () => {
  return (
    <Box className="container">
      <h2> Earn NFT's being productive!</h2>
      {/* <SetPomodoro /> */}
      <CountDownAnimation />
    </Box>
  );
};
