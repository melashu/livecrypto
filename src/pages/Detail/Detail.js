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
            <span> Rank:</span>
            <span>
              {' '}
              {selectedCrypto.rank}
            </span>
          </li>
          <li>
            <span>Symbole:</span>
            <span>
              {' '}
              {selectedCrypto.symbol}
            </span>
          </li>
          <li>
            <span> Supply:</span>
            <span>
              {' '}
              {selectedCrypto.supply}
            </span>
          </li>

          <li>
            <span> Market Cap Usd:</span>
            <span>
              {' '}
              {selectedCrypto.marketCapUsd}
            </span>
          </li>
          <li>
            <span> Volume Usd 24Hr:</span>
            <span>
              {' '}
              {selectedCrypto.volumeUsd24Hr}
            </span>
          </li>
          <li>
            <span>Price Usd:</span>
            <span>
              {' '}
              {selectedCrypto.priceUsd}
            </span>
          </li>
          <li>
            <span> Change Percent 24Hr:</span>
            <span>
              {' '}
              {selectedCrypto.changePercent24Hr}
            </span>
          </li>
          <li>
            <span> Vwap 24Hr:</span>
            <span>{selectedCrypto.vwap24Hr}</span>
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
