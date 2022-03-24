import React from "react";
import { useCall } from "@usedapp/core";
import { utils } from "ethers";
import { Card } from "react-bootstrap";

export const LendingManager = ({
  CLendingManagerAddress,
  CLendingManagerContract,
}) => {
  const { value } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getDepositBalance",
        args: [],
      }
    ) ?? {};

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Lending Manager</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            {value === undefined ? "undefined" : utils.formatEther(value?.[0])}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
