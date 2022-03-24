import React, { useState } from "react";

const priceFeedURL = {
  ETH: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=CHF,USD",
  DAI: "https://min-api.cryptocompare.com/data/price?fsym=DAI&tsyms=CHF,USD",
};

export const PriceFeed = (token) => {
  return fetch(priceFeedURL[token])
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
