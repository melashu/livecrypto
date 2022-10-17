import { configureStore } from '@reduxjs/toolkit';
import cryptoreducer from './cryptoreducer';

const store = configureStore({
  reducer: {
    crypto: cryptoreducer,
  },
});

export default store;
