import React, { useState, useEffect } from "react";
import { useContractFunction, useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export const Stake = ({ CLendingManagerContract, account, notify, eth }) => {
  const [deposit, setDeposit] = useState(0);
  const [maturity, setMaturity] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [valueInUSD, setValueInUSD] = useState(0);
  const { notifications } = useNotifications();
  const _now = new Date();

  const { send: stakeSend } = useContractFunction(
    CLendingManagerContract,
    "stake",
    {
      transactionName: "Stake Amount",
    }
  );

  const onChangeHandler = (event) => {
    setDeposit(event.target.value);
    setValueInUSD(event.target.value * eth["USD"]);
  };

  const onDateChangeHandler = (event) => {
    const _date = new Date(event.target.value);
    const _diff = parseInt((_date - _now) / (1000 * 60 * 60 * 24), 10);
    setMaturity(_diff);
  };

  const onClickHandler = (event) => {
    stakeSend(maturity, {
      from: account,
      value: utils.parseEther(deposit),
    });
    setProcessing(true);
  };

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake Amount"
      ).length > 0
    ) {
      if (processing) {
        setProcessing(false);
        notify("Stake succeeded!");
      }
    }
  }, [notifications, notify, processing]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Stake</Card.Title>
        <Card.Text as="div">
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="amount_to_deposit">
                <Form.Control
                  type="number"
                  name="deposit"
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="deposit_maturity">
                <Form.Control
                  type="date"
                  name="maturity"
                  placeholder="Maturity"
                  onChange={onDateChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="amount_to_deposit">
                {processing ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <Button variant="outline-primary" onClick={onClickHandler}>
                    Deposit
                  </Button>
                )}{" "}
              </Form.Group>
            </Row>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
