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
import { useCryptoDispatch, useCryptoSelector } from '../../components/Hook';
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
          <h2>Real-time Crypto Prices</h2>
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
          <div className="bottom-top">
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
          </div>
          <ul className="items">
            {filtered.map((item) => (
              <li key={item.name}>
                <Link
                  to={`cryptodetail/${item.id}`}
                  state={item}
                  className="item"
                >
                  <div className="item-container">
                    <h3 data-testid="cryptoname">{item.name}</h3>
                    <h4>{item.symbol}</h4>
                    <span>{item.priceUsd}</span>
                  </div>
                  <span>
                    <ArrowRightIcon className="icon" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {' '}
    </div>
  );
};

export default Home;
