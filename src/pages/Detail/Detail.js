import React from 'react';
import { useLocation } from 'react-router-dom';
import './detail.scss';
import crypto from '../../image/crypto.jpg';

const Detail = () => {
  const location = useLocation();
  const selectedCrypto = location.state;
  return (
    <div className="container">
      <div className="top">
        <div className="left">
          <img src={crypto} alt="crypto" />
        </div>
        <div className="right">
          <p>Real time Crypto price </p>
          <p>{selectedCrypto.name}</p>
          <p>{selectedCrypto.symbol}</p>
          <p>{selectedCrypto.rank}</p>
        </div>
      </div>
      <div className="item" key={crypto.id}>
        <div>
          <h1 className="detail-title">
            Detail about
            {selectedCrypto.name}
          </h1>
        </div>
        <ul className="item-detail">
          <li>
            Crypto Rank:
            {selectedCrypto.rank}
          </li>
          <li>
            Crypto Symbole:
            {selectedCrypto.symbol}
          </li>
          <li>
            Crypto supply:
            {selectedCrypto.supply}
          </li>

          <li>
            Crypto market Cap Usd:
            {selectedCrypto.marketCapUsd}
          </li>
          <li>
            Crypto volume Usd 24Hr:
            {selectedCrypto.volumeUsd24Hr}
          </li>
          <li>
            Crypto price Usd:
            {selectedCrypto.priceUsd}
          </li>
          <li>
            Crypto change Percent 24Hr:
            {selectedCrypto.changePercent24Hr}
          </li>
          <li>
            Crypto vwap 24Hr:
            {selectedCrypto.vwap24Hr}
          </li>
          <li>
            <a href={selectedCrypto.explorer}>Explorer More</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Detail;
