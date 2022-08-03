import React from "react";
import { useCall } from "@usedapp/core";
import { Table } from "react-bootstrap";
import { utils } from "ethers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContractFunction, useNotifications } from "@usedapp/core";

export const CollateralOverview = ({ collaterals }) => {
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <Table borderless>
      <thead>
        <tr>
          <th>Collateral</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Maturity</th>
          <th>Expires</th>
          <th>Expired</th>
        </tr>
      </thead>
      <tbody>
        {collaterals.map((collateral) => (
          <tr key={collateral.key}>
            <td>{collateral.participant}</td>
            <td>{utils.formatEther(collateral.amount.toString())} ETH</td>
            <td>
              {new Date(
                collateral.timestamp.toString() * 1000
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{collateral.duration_in_days.toString()} days</td>
            <td>
              {addDays(
                new Date(collateral.timestamp.toString() * 1000),
                collateral.duration_in_days.toNumber()
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{collateral.expired.toString()}</td>
            <td>
              <Button variant="outline-primary">Handback</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
