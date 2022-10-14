/* eslint-disable */

import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { useCryptoSelector } from "../../coponents/Hook";
import { getCryptoInfo } from "../../redux/cryptoreducer";
import "./detail.scss";
import crypto from "../../image/crypto.jpg";
const Detail = () => {
  // const { id } = useParams();
  // const items = useCryptoSelector(getCryptoInfo);
  const location = useLocation();
  // const item
  // const selectedCrypto = items.filter((crypto) => crypto.id.toString() === id);
  const selectedCrypto = location.state;

  return (
    <div className="container">
      <div className="top">
        <div className="left">
          <img src={crypto} alt="crypto" />
        </div>
        <div className="right">
          <p>Real time Crypto price </p>
          <p>Crypto ID: {selectedCrypto.id}</p>
          <p>Crypto Name: {selectedCrypto.name}</p>
          <p>Crypto Symoble: {selectedCrypto.symbol}</p>
        </div>
      </div>
      <div className="item" key={crypto.id}>
        <div>
          <h1 className="detail-title">Detail about {selectedCrypto.name} </h1>
        </div>
        <div className="item-detail">
          <p>Crypto Rank: {selectedCrypto.genus}</p>
          <p>Crypto Symbole: {selectedCrypto.symbol}</p>
          <p>Crypto supply: {selectedCrypto.supply}</p>
          <p>Crypto max Supply: {selectedCrypto.maxSupply}</p>
          <p>Crypto market Cap Usd: {selectedCrypto.marketCapUsd}</p>
          <p>Crypto volume Usd 24Hr: {selectedCrypto.volumeUsd24Hr}</p>
          <p>Crypto price Usd: {selectedCrypto.priceUsd}</p>
          <p>Crypto change Percent 24Hr: {selectedCrypto.changePercent24Hr}</p>
          <p>Crypto vwap 24Hr: {selectedCrypto.vwap24Hr}</p>
          <a href={selectedCrypto.explorer}>Explorer More</a>
        </div>
      </div>
    </div>
  );
};

export default Detail;
