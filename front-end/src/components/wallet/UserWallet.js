import { formatUnits } from "@ethersproject/units";
import { Token, useEthers, useTokenBalance } from "@usedapp/core";
import { Box } from "@mui/material";

export const UserWallet = (token) => {
  const sx = {
    container: {
      display: "inline-grid",
      gridTemplateColumns: "auto auto auto",
      alignItems: "center",
      gap: 1,
    },
    amount: {
      fontWeight: 700,
    },
  };

  const { address } = token;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(address, account);
  const formattedTokenBalance = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  return (
    <Box component="div" sx={sx.container}>
      <div>RoboToken</div>
      <div className={sx.amount}>{formattedTokenBalance}</div>
    </Box>
  );
};
