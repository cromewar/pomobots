import { useMoralis } from "react-moralis";

export const Header = () => {
  const { isWeb3Enabled, enableWeb3, authenticate, isAuthenticated, logout } =
    useMoralis();
  const enableAndAuthenticate = async () => {
    await enableWeb3();
    await authenticate();
  };
  return (
    <button
      onClick={() => {
        if (!isWeb3Enabled || !isAuthenticated) {
          enableAndAuthenticate();
        } else {
          logout();
        }
      }}
    >
      {isAuthenticated ? "Disconnect" : "Connect"}
    </button>
  );
};
