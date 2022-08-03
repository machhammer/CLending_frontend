import React from "react";
import { Table } from "react-bootstrap";
import { utils } from "ethers";
import { Button } from "react-bootstrap";

export const StakesOverview = ({ stakes }) => {
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
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
        {stakes.map((stake) => (
          <tr key={stake.key}>
            <td>{stake.participant}</td>
            <td>{utils.formatEther(stake.amount.toString())} ETH</td>
            <td>
              {new Date(stake.timestamp.toString() * 1000).toLocaleDateString(
                "de-DE",
                {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </td>
            <td>{stake.duration_in_days.toString()} days</td>
            <td>
              {addDays(
                new Date(stake.timestamp.toString() * 1000),
                stake.duration_in_days.toNumber()
              ).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{stake.expired.toString()}</td>
            <td>
              <Button variant="outline-primary">Handback</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
