/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React from "react";
import { useEthers } from "@usedapp/core";
import { LendingStage } from "./LendingStage";
import { Contract } from "@ethersproject/contracts";
import ContractAddresses from "./json/map.json";
import CLendingManager from "./json/CLendingManager.json";
import { utils } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import networks from "./config/networks.json";

export const Main = () => {
  let { chainId } = useEthers();
  const { account } = useEthers();

  const notify = (message) => toast.success(message);

  if (chainId === undefined) return <div>Please connect</div>;

  if (chainId === 1337) {
    chainId = 5777;
  }

  if (ContractAddresses[chainId] === undefined) {
    return <div>Invalid Network: {networks[chainId]}</div>;
  }

  const CLendingManagerAddress = chainId
    ? ContractAddresses[chainId]["CLendingManager"][0]
    : undefined;

  const { abi } = CLendingManager;
  const CLendingManagerInterface = new utils.Interface(abi);
  const CLendingManagerContract = new Contract(
    CLendingManagerAddress,
    CLendingManagerInterface
  );

  return (
    <LendingStage
      chainId={chainId}
      CLendingManagerAddress={CLendingManagerAddress}
      CLendingManagerContract={CLendingManagerContract}
      account={account}
      notify={notify}
    />
  );
};
