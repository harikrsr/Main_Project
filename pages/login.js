import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "../components/Button";
import logo from "../public/svg/logo.svg";
import vote from "../assets/images/vote.svg";
import voting from "../assets/images/voting.svg";
import select from "../assets/images/select.svg";
import result from "../assets/images/result.svg";
import wallet from "../assets/images/wallet.svg";
import Image from "next/image";
import { CheckCircle } from "react-feather";
import Link from "next/link";
import Head from "next/head";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import router from "next/router";
import routeNames from "../routes";
import { logout } from "../components/Utils";
import { appDetailsContext } from "../context/AppDetails";

function Login() {
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");

  const [appDetails, setAppDetails] = useContext(appDetailsContext);

  const handleClick = async () => {
    setLoading(true);
    try {
      const web3Modal = new Web3Modal();

      const connection = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const chainId = (await provider.getNetwork()).chainId;
      const user = await signer.getAddress();

      if (chainId !== parseInt(selectedNetwork)) {
        setError("Make Sure you are connected to the choosen network ⚠️");
        throw new Error("Make Sure you are connected to the choosen network ⚠️");
      }

      setAppDetails({
        address: user,
        chainId,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    setPressed(true);
    setTimeout(() => router.push(routeNames.dashboard), 1000);
  };

  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <Head>
        <title>Secure Vote | Login</title>
      </Head>
      <div className="grid xl:grid-cols-2 gap-40 pt-24 px-32 bg-indigo-200">
        <div className="pb-10 xl:px-10 mx-auto  pt-56">
          <h1 className="text-4xl text-primary">Secure Vote</h1>A platform that
          gives you access to <br /> a secure polling system developed <br />{" "}
          using Metis blockchain technology.<br /><br />
          <h2>HOW TO VOTE</h2><br />
          <div className="flex text-center grid xl:grid-cols-4 place-content-center">
          <div><Image src={wallet}  width={48} height={48} alt=""/>
           <br /><h5>Connect your wallet & Login</h5></div>
           <div><Image src={select} width={48} height={48} alt=""/> 
          <br /><h5>Create  or <br />Find Poll</h5></div>
        <div><Image src={voting}  width={48} height={48} alt=""/>  
          <br /><h5>Submit vote</h5></div>
        <div><Image src={result} width={48} height={48} alt=""/> 
          <br /><h5>Wait for Result</h5></div></div>
        </div>
        <div className="bg-white p-10 py-32 text-center">
          {!pressed ? (
            <div className="card">
              <Image src={logo} width={150} height={150} alt="" />
              <h1 className="text-primary text-4xl">
                <b>Secure Vote</b>
              </h1>
              <div className="mt-10">
                <label>Network: </label>
                <select
                  className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={selectedNetwork}
                  onChange={(e) => {
                    setError("");
                    setSelectedNetwork(e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select Network
                  </option>
                  <option value={1088}>Metis Andromeda Mainnet</option>
                  <option value={588}>Metis Stardust Testnet</option>
                </select>
              </div>
              <Button className="my-4" onClick={handleClick}>
                {loading
                  ? "Connecting Securely..."
                  : "Connect to Metamask Wallet"}
              </Button>
              {error && (
                <div className="text-red-500 text-sm mb-10">{error}</div>
              )}
              <p className="uppercase">
                Login Securely Here{" "}
              </p>
            </div>
          ) : (
            <div className="card flex flex-col justify-center items-center">
              <h1 className="text-primary text-4xl">Successful</h1>
              <CheckCircle
                width={80}
                height={80}
                className="text-primary my-5"
                strokeWidth={1}
              />
              <br />
              <Button disabled>Connected</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
// #f9fafc
