import { Button } from "@mui/material";

export const PomoButton = ({ title, activeClass, _callback }) => {
  const sx = {
    button: {
      justifyContent: "center",
      marginTop: "15px",
      borderColor: "black",
      color: "black",
    },
  };
  return (
    <Button
      className={activeClass}
      sx={sx.button}
      onClick={_callback}
      variant="outlined"
    >
      {title}
    </Button>
  );
};
