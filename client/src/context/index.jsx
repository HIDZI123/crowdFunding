import { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useConnect,
  metamaskWallet
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x6F8b7445BaBc760EC4c5aa7C5E98a406a29Fbf31"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connectWithMetamask = useConnect();

  const connect = async () => {
    try {
      // Create a metamask wallet config and pass it to the connect function
      const metamaskConfig = metamaskWallet();
      await connectWithMetamask(metamaskConfig);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("Contract Call successfully: ", data);
    } catch (error) {
      console.log("Contarct Call Failure", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
