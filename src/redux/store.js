// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // default sudah cukup
});

export default store;