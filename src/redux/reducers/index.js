import { combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import modalSlice from './modalSlice'

const reducer = combineReducers({
  form: formReducer,
  modal: modalSlice,
  // tambahkan reducer lain jika ada
});

export default reducer;