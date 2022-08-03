import React, { useState, useEffect } from "react";
import { useCall, useContractFunction, useNotifications } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export const Borrow = ({ CLendingManagerContract, account, notify, eth }) => {
  const [deposit, setDeposit] = useState(0);
  const [maturity, setMaturity] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [valueInUSD, setValueInUSD] = useState(0);
  const { notifications } = useNotifications();
  const _now = new Date();

  const { state, send: borrowingSend } = useContractFunction(
    CLendingManagerContract,
    "borrow",
    {
      transactionName: "Borrow Amount",
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
    borrowingSend(utils.parseEther(deposit), account);
    setProcessing(true);
  };

  useEffect(() => {
    console.log(state);
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Borrow Amount"
      ).length > 0
    ) {
      if (processing) {
        setProcessing(false);
        notify("Borrowing succeeded!");
      }
    }
  }, [notifications, notify, processing]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Borrow</Card.Title>
        <Card.Text as="div">
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="amount_to_borrow">
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
              <Form.Group as={Col} controlId="spinner">
                {processing ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <Button variant="outline-primary" onClick={onClickHandler}>
                    Borrow
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
