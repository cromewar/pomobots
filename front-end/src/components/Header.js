import "../styles/Header.css";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";

import { Button, Box, Tab, Tabs } from "@mui/material";
import { TokenBalance } from "./wallet/UserWallet";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useState, useEffect } from "react";
import networkMapping from "../chain-info/deployments/map.json";

import { UserWallet } from "./wallet/UserWallet";

const isValidNetwork = (network) => {
  if (networkMapping.hasOwnProperty(network)) {
    return true;
  }
  return false;
};

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
    tabs: {
      marginLeft: "15px",
      marginTop: "10px",
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

  const [networkId, setNetworkId] = useState(null);

  useEffect(() => {
    getChain().then(setNetworkId);
  }, [isWeb3Enabled]);

  Moralis.onChainChanged(async () => {
    getChain().then(setNetworkId);
  });

  const { chainId, error } = useEthers();

  const roboTokenAddress = chainId
    ? networkMapping[String(chainId)]["RoboToken"][0]
    : constants.AddressZero;

  const tokenAd = "0xbFC98BA1eEd442ca5cC27f8b4967bCdcA2E86BC0";

  return (
    <Box component="nav" sx={sx.navbar}>
      <div className="navbar-header">
        <h2 className="title1"> Pomobots</h2>
        <Box sx={sx.tabs}>
          <Tabs>
            <Tab label="Mint Bots" className={sx.but} />
            <Tab label="Demo Mode" className={sx.but} />
          </Tabs>
        </Box>
      </div>
      <div>
        <UserWallet token={tokenAd}></UserWallet>
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
