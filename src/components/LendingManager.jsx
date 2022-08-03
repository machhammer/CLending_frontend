import React from "react";
import { utils } from "ethers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { StakesOverview } from "./manager/StakesOverview";
import { CollateralOverview } from "./manager/CollateralOverview";
import { BorrowingOverview } from "./manager/BorrowingOverview";

export const LendingManager = ({ keys, elements, balance, owner, account }) => {
  if (owner != account) return <div>Not allowed</div>;

  return (
    <Container fluid>
      <Row className="p-2">
        <Col>
          <StakesOverview
            stakes={
              keys !== undefined
                ? elements[0].filter((e) => e.element_type == 1)
                : []
            }
          />
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <CollateralOverview
            collaterals={
              keys !== undefined
                ? elements[0].filter((e) => e.element_type == 2)
                : []
            }
          />
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <BorrowingOverview
            borrowings={
              keys !== undefined
                ? elements[0].filter((e) => e.element_type == 3)
                : []
            }
          />
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
          <Button variant="outline-primary">Handback</Button>
        </Col>
      </Row>
    </Container>
  );
};
