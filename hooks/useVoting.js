import { ethers } from "ethers";
import { useContext } from "react";
import Web3Modal from "web3modal";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";
import { appDetailsContext } from "../context/AppDetails";

const getUrl = (chainId) => {
  switch (chainId) {
    case 588:
      return "https://stardust.metis.io/?owner=588";
    case 1088:
      return "https://andromeda.metis.io/?owner=1088";
    default:
      throw new Error("Invalid network");
  }
};

const getContractAddress = (chainId) => {
  switch (chainId) {
    case 588:
      return "0xaae426379d68423d1487685b2f51d0570870ab93";
    case 1088:
      return "0xaae426379d68423d1487685b2f51d0570870ab93";
    default:
      throw new Error("Invalid network");
  }
};

const useVoting = async ({ getRequest = true }) => {
  const [appDetails, setAppDetails] = useContext(appDetailsContext);
  const address = appDetails.address;
  if (getRequest) {
    const provider = new ethers.providers.JsonRpcProvider({
      url: getUrl(appDetails.chainId),
    });
    const contract = new ethers.Contract(
      getContractAddress(appDetails.chainId),
      Voting.abi,
      provider
    );
    return { address, contract };
  } else {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      getContractAddress(appDetails.chainId),
      Voting.abi,
      signer
    );
    return { address, contract };
  }
};

export default useVoting;
