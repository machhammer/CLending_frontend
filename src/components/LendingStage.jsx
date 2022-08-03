import React, { useState } from "react";
import { useCall } from "@usedapp/core";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Wallet } from "./wallet/Wallet";
import { Conversion } from "./Conversion";
import { LendingClient } from "./LendingClient";
import { LendingManager } from "./LendingManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import networks from "./config/networks.json";

export const LendingStage = ({
  chainId,
  CLendingManagerAddress,
  CLendingManagerContract,
  account,
  notify,
}) => {
  const [eth, setETH] = useState(0);
  const [dai, setDAI] = useState(0);

  const { value: owner } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getOwner",
        args: [],
      }
    ) ?? {};

  const { value: keys } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getElementKeys",
        args: [],
      }
    ) ?? {};

  const { value: elements } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getAllElements",
        args: [],
      }
    ) ?? {};

  const { value: balance } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getBalance",
        args: [],
      }
    ) ?? {};

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
                <LendingClient
                  CLendingManagerContract={CLendingManagerContract}
                  keys={keys}
                  elements={elements}
                  balance={balance}
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
                  keys={keys}
                  elements={elements}
                  balance={balance}
                  owner={owner}
                  account={account}
                />
              }
            />
            )
          </Routes>
        </Col>
      </Row>
      <div>
        <ToastContainer />
      </div>
    </Container>
  );
};
