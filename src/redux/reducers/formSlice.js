// src/redux/reducers/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // array untuk menyimpan semua entri form
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action untuk menambahkan data baru
    addFormData: (state, action) => {
      state.data.push(action.payload);
    },
    // (Opsional) Action untuk menghapus data
    removeFormData: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    // (Opsional) Reset semua data
    clearAllData: (state) => {
      state.data = [];
    },
  },
});

// Ekspor action
export const { addFormData, removeFormData, clearAllData } = formSlice.actions;

// Ekspor reducer
export default formSlice.reducer;