import React from "react";
import { useCall } from "@usedapp/core";
import { utils } from "ethers";
import { Card } from "react-bootstrap";

export const LendingManager = ({
  CLendingManagerAddress,
  CLendingManagerContract,
}) => {
  const { value: keys } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getDepositKeys",
        args: [],
      }
    ) ?? {};

  const { value: keys } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getDepositKeys",
        args: [],
      }
    ) ?? {};

  const list_items = (keys !== undefined ? keys[0] : []).map((key) => (
    <li key="{key}">{key}</li>
  ));

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Lending Manager</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>{list_items}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
