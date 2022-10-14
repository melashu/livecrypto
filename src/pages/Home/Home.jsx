/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { SearchRounded } from '@mui/icons-material';
import {
  cryptoThunk,
  getCryptoInfo,
  getLoading,
} from '../../redux/cryptoreducer';
import { useCryptoDispatch, useCryptoSelector } from '../../coponents/Hook';
import './home.scss';
import crypto from '../../image/crypto.jpg';

const Home = () => {
  const cryptoList = useCryptoSelector(getCryptoInfo);
  const loading = useCryptoSelector(getLoading);
  const dispatch = useCryptoDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = cryptoList.filter((crypto) => {
    if (searchTerm === '') return crypto;
    if (crypto.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return crypto;
    }
    return null;
  });
  useEffect(() => {
    if (cryptoList.length === 0) dispatch(cryptoThunk());
  }, [dispatch, cryptoList.length]);

  return (
    <div className="home-container">
      <div className="top">
        <div className="left">
          <img src={crypto} alt="crypto" />
        </div>
        <div className="right">
          <p>Real-time Crypto Prices</p>
          <p>Total number of Coin </p>
          <p data-testid="count">{cryptoList.length}</p>
        </div>
      </div>
      {(loading === 'pending' || loading === 'idel') && (
        <HashLoader
          loading
          color="#fff"
          size={55}
          data-testid="hashloader"
          cssOverride={{
            position: 'absolute',
            top: '120%',
            left: '45%',
          }}
          speedMultiplier={1}
        />
      )}
      {' '}
      {loading === 'rejected' && (
        <div className={`loading ${loading}`}>Something went wrong...</div>
      )}
      {' '}
      {loading === 'success' && (
        <div className="bottom">
          <h2>Filter Crypto by name</h2>
          <div className="search">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search crypto...."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <SearchRounded className="icon" />
          </div>
          <div className="items">
            {filtered.map((item) => (
              <div key={item.name}>
                <Link
                  to={`cryptodetail/${item.id}`}
                  state={item}
                  className="item"
                >
                  <div className="item-container">
                    <p data-testid="cryptoname">
                      Crypto Name:
                      {item.name}
                    </p>
                    <p>
                      Crypto Symbol:
                      {item.symbol}
                    </p>
                    <p>
                      Crypto Prices in USD:
                      {item.priceUsd}
                    </p>
                  </div>
                  <span>
                    <ArrowRightIcon className="icon" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {' '}
    </div>
  );
};

export default Home;
