import React from "react";
import { useCall } from "@usedapp/core";
import { Table } from "react-bootstrap";
import { utils } from "ethers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContractFunction, useNotifications } from "@usedapp/core";

export const BorrowingOverview = ({ borrowings }) => {
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <Table borderless>
      <thead>
        <tr>
          <th>Borrower</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Maturity</th>
          <th>Expires</th>
          <th>Expired</th>
        </tr>
      </thead>
      <tbody>
        {borrowings.map((borrowing) => (
          <tr key={borrowing.key}>
            <td>{borrowing.participant}</td>
            <td>{utils.formatEther(borrowing.amount.toString())} ETH</td>
            <td>
              {new Date(
                borrowing.timestamp.toString() * 1000
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{borrowing.duration_in_days.toString()} days</td>
            <td>
              {addDays(
                new Date(borrowing.timestamp.toString() * 1000),
                borrowing.duration_in_days.toNumber()
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{borrowing.expired.toString()}</td>
            <td>
              <Button variant="outline-primary">Handback</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
