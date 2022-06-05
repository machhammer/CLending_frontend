import React from "react";
import { useCall } from "@usedapp/core";
import { Table } from "react-bootstrap";
import { utils } from "ethers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContractFunction, useNotifications } from "@usedapp/core";

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

  const { value: deposits } =
    useCall(
      CLendingManagerAddress && {
        contract: CLendingManagerContract,
        method: "getAllDeposits",
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

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const { send: handbackExpiredDeposits } = useContractFunction(
    CLendingManagerContract,
    "handbackExpiredDeposits",
    {
      transactionName: "handbackExpiredDeposits",
    }
  );

  const { send: handbackDeposit } = useContractFunction(
    CLendingManagerContract,
    "handbackDeposit",
    {
      transactionName: "handbackDeposit",
    }
  );

  const onHandbackExpiredDepositsHandler = (event) => {
    handbackExpiredDeposits({});
  };

  const onHandbackDepositHandler = (_key) => {
    handbackDeposit(_key, {});
    console.log("Handback: ", _key);
  };

  return (
    <Container fluid>
      <Row className="p-2">
        <Col>
          <Table borderless>
            <thead>
              <tr>
                <th>Depositor</th>
                <th>Amount</th>
                <th>Created</th>
                <th>Maturity</th>
                <th>Expires</th>
                <th>Expired</th>
              </tr>
            </thead>
            <tbody>
              {(keys !== undefined ? deposits[0] : []).map((deposit) => (
                <tr key={deposit.key}>
                  <td>{deposit.depositor}</td>
                  <td>{utils.formatEther(deposit.amount.toString())} ETH</td>
                  <td>
                    {new Date(
                      deposit.timestamp.toString() * 1000
                    ).toLocaleDateString("de-DE", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{deposit.duration_in_days.toString()} days</td>
                  <td>
                    {addDays(
                      new Date(deposit.timestamp.toString() * 1000),
                      deposit.duration_in_days.toNumber()
                    ).toLocaleDateString("de-DE", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{deposit.expired.toString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => onHandbackDepositHandler(deposit.key)}
                    >
                      Handback
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          Balance:{" "}
          {balance === undefined
            ? "empty"
            : utils.formatEther(balance.toString())}
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            onClick={onHandbackExpiredDepositsHandler}
          >
            Handback
          </Button>
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <Table borderless>
            <thead>
              <tr>
                <th>Depositor</th>
                <th>Amount</th>
                <th>Created</th>
                <th>Maturity</th>
                <th>Expires</th>
                <th>Expired</th>
              </tr>
            </thead>
            <tbody>
              {(keys !== undefined ? deposits[0] : []).map((deposit) => (
                <tr key={deposit.key}>
                  <td>{deposit.depositor}</td>
                  <td>{utils.formatEther(deposit.amount.toString())} ETH</td>
                  <td>
                    {new Date(
                      deposit.timestamp.toString() * 1000
                    ).toLocaleDateString("de-DE", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{deposit.duration_in_days.toString()} days</td>
                  <td>
                    {addDays(
                      new Date(deposit.timestamp.toString() * 1000),
                      deposit.duration_in_days.toNumber()
                    ).toLocaleDateString("de-DE", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{deposit.expired.toString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => onHandbackDepositHandler(deposit.key)}
                    >
                      Handback
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          Balance:{" "}
          {balance === undefined
            ? "empty"
            : utils.formatEther(balance.toString())}
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            onClick={onHandbackExpiredDepositsHandler}
          >
            Handback
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
