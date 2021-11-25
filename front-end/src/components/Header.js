import { Button, Box } from "@mui/material";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useState, useEffect } from "react";
import networkMapping from "../chain-info/deployments/map.json";

const isValidNetwork = (network) => {
  if (networkMapping.hasOwnProperty(network)) {
    return true;
  }
  return false;
};

const tabOptions = ["Mint Pomobot", "Demo Mode"];

export const Header = () => {
  const sx = {
    navbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      justifyContent: "space-between",
      marginLeft: "30px",
      marginRight: "30px",
      paddingBottom: "0px",
      paddingTop: "16px",

      // backgroundColor: "#f9f3df",
    },
    but: { fontFamily: "Free Pixel", fontSize: "16px" },
  };

  const {
    enableWeb3,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
    web3,
    Moralis,
  } = useMoralis();

  const { Web3Api } = useMoralisWeb3Api();

  const enableAndAuthenticate = async () => {
    await enableWeb3();
    await authenticate();
  };

  const getChain = async () => {
    if (isAuthenticated && isWeb3Enabled) {
      return await web3.eth.getChainId();
    }
    return null;
  };

  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);
  const [networkId, setNetworkId] = useState(null);

  useEffect(() => {
    getChain().then(setNetworkId);
  }, [isWeb3Enabled]);

  Moralis.onChainChanged(async () => {
    getChain().then(setNetworkId);
  });

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const retroCatsAddress = isValidNetwork(networkId)
    ? networkMapping[networkId.toString()]["RoboToken"][0]
    : "0x0000000000000000000000000000000000000000";
  return (
    <Box component="nav" sx={sx.navbar}>
      <div>
        <h2 className="title1"> Pomobots</h2>
        <h2 className="title1"> Pomobots</h2>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          sx={sx.but}
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
      </div>
    </Box>
  );
};
