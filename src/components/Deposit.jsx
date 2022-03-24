import React, { useState, useEffect } from "react";
import { useContractFunction, useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Button, Card } from "react-bootstrap";
// import { Calendar } from "react-bootstrap-calendar";

export const Deposit = ({
  CLendingManagerContract,
  notify,
  ethusd,
  ethchf,
}) => {
  const [deposit, setDeposit] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [valueInUSD, setValueInUSD] = useState(0);

  const { notifications } = useNotifications();

  const { send: stakeSend } = useContractFunction(
    CLendingManagerContract,
    "depositAmount",
    {
      transactionName: "Deposit Amount",
    }
  );
  const onChangeHandler = (event) => {
    setDeposit(event.target.value);
    setValueInUSD(event.target.value * ethusd);
  };
  const onClickHandler = (event) => {
    stakeSend({ value: utils.parseEther(deposit) });
    setProcessing(true);
  };

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Deposit Amount"
      ).length > 0
    ) {
      setProcessing(false);
      notify("Deposit succeeded!");
    }
  }, [notifications]);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Deposit</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Amount</Card.Subtitle>
          <Card.Text as="div">
            <Form>
              <Form.Group className="mb-3" controlId="amount_to_deposit">
                <Form.Control
                  type="number"
                  name="deposit"
                  onChange={onChangeHandler}
                />
                <span>{valueInUSD}</span>
              </Form.Group>
              {processing ? (
                <div className="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Button variant="outline-primary" onClick={onClickHandler}>
                  Stake
                </Button>
              )}{" "}
              {/* <Calendar /> */}
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
