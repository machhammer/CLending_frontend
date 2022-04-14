import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import eth_logo from "../images/eth.png";
import dai_logo from "../images/dai.png";
import { PriceFeed } from "../components/helper/ApiCalls";

export const Conversion = ({ eth, setETH, dai, setDAI }) => {
  function callPriceFeeds() {
    PriceFeed("ETH").then((response) => {
      setETH(response);
    });
    PriceFeed("DAI").then((response) => {
      setDAI(response);
    });
  }
  useEffect(() => {
    callPriceFeeds();
    const interval = setInterval(() => {
      callPriceFeeds();
    }, 300000);
    return () => {
      clearInterval(interval);
      setETH(0);
      setDAI(0);
    };
  }, []);

  return (
    <div className="p-2 d-flex justify-content-between border rounded-2">
      <Table borderless>
        <thead>
          <tr>
            <th>Asset</th>
            <th>USD</th>
            <th>CHF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={eth_logo} width="30" />
            </td>
            <td>{eth["USD"]} </td>
            <td>{eth["CHF"]}</td>
          </tr>
          <tr>
            <td>
              <img src={dai_logo} width="30" />
            </td>
            <td>{dai["USD"]} </td>
            <td>{dai["CHF"]}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
