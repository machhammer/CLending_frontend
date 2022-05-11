import React from "react";
import { useCall } from "@usedapp/core";
import { Table } from "react-bootstrap";
import { utils } from "ethers";

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

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <div className="p-2 d-flex justify-content-between border rounded-2">
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
              <td>{deposit.isValid.toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
