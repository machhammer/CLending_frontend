import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Borrow } from "./client/Borrow";
import { Collateral } from "./client/Collateral";
import { Stake } from "./client/Stake";
import { StakesOverview } from "./manager/StakesOverview";
import { CollateralOverview } from "./manager/CollateralOverview";
import { BorrowingOverview } from "./manager/BorrowingOverview";

export const LendingClient = ({
  CLendingManagerContract,
  account,
  notify,
  eth,
  keys,
  elements,
  balance,
}) => {
  return (
    <Container fluid>
      <Row className="p-2">
        <Col>
          <Stake
            CLendingManagerContract={CLendingManagerContract}
            account={account}
            notify={notify}
            eth={eth}
          />
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <StakesOverview
            stakes={
              keys !== undefined
                ? elements[0].filter(
                    (e) => e.element_type == 1 && e.participant == account
                  )
                : []
            }
          />
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <Collateral
            CLendingManagerContract={CLendingManagerContract}
            account={account}
            notify={notify}
            eth={eth}
          />
        </Col>
        <CollateralOverview
          collaterals={
            keys !== undefined
              ? elements[0].filter(
                  (e) => e.element_type == 2 && e.participant == account
                )
              : []
          }
        />
      </Row>
      <Row className="p-2">
        <Col>
          <Borrow
            CLendingManagerContract={CLendingManagerContract}
            account={account}
            notify={notify}
            eth={eth}
          />
        </Col>
      </Row>
    </Container>
  );
};
