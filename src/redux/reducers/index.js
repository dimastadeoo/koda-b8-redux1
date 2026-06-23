// src/redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const reducer = combineReducers({
  form: formReducer,
  // tambahkan reducer lain jika ada
});

export default reducer;