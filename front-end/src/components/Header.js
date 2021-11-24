import { Button, Box } from "@mui/material";
import { useMoralis } from "react-moralis";

export const Header = () => {
  const sx = {
    navbar: {
      display: "flex",
      alignItems: "center",
      padding: 4,
      justifyContent: "space-between",
      marginLeft: "30px",
      marginRight: "30px",
      paddingBottom: "0px",
      paddingTop: "16px",
      // backgroundColor: "#f9f3df",
    },
  };

  const {
    enableWeb3,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();

  const enableAndAuthenticate = async () => {
    await enableWeb3();
    await authenticate();
  };

  return (
    <Box component="nav" sx={sx.navbar}>
      <h2 className="title1"> Pomobots</h2>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          if (!isWeb3Enabled || !isAuthenticated) {
            enableAndAuthenticate();
          } else {
            logout();
          }
        }}
        disabled={isAuthenticating}
      >
        {isAuthenticating || isWeb3EnableLoading
          ? "Loading..."
          : !isAuthenticated || !isWeb3Enabled
          ? "Connect Wallet"
          : "Disconnect"}
      </Button>
    </Box>
  );
};
