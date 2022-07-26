/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { Wallet } from "./wallet/Wallet";
import { Conversion } from "./Conversion";
import { Deposit } from "./Deposit";
import { LendingManager } from "./LendingManager";
import { Contract } from "@ethersproject/contracts";
import ContractAddresses from "./json/map.json";
import CLendingManager from "./json/CLendingManager.json";
import { utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
import networks from "./config/networks.json";

export const Main = () => {
  let { chainId } = useEthers();
  const { account } = useEthers();

  const [eth, setETH] = useState(0);
  const [dai, setDAI] = useState(0);

  const [tokens, setToken] = useState({ Token: "na", USD: 0, CHF: 0 });

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
    <Container fluid>
      <Row className="p-2">
        <Col>
          <Wallet network={networks[chainId]} account={account} />
        </Col>
        <Col>
          <Conversion eth={eth} setETH={setETH} dai={dai} setDAI={setDAI} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Routes>
            <Route
              path="/client"
              element={
                <Deposit
                  CLendingManagerContract={CLendingManagerContract}
                  account={account}
                  notify={notify}
                  eth={eth}
                />
              }
            />
            <Route
              path="/manager"
              element={
                <LendingManager
                  CLendingManagerAddress={CLendingManagerAddress}
                  CLendingManagerContract={CLendingManagerContract}
                />
              }
            />
          </Routes>
        </Col>
      </Row>
      <div>
        <ToastContainer />
      </div>
    </Container>
  );
};
