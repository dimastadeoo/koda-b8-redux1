import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'alert', // 'alert' atau 'confirm'
  message: '',
  onConfirm: null, // callback untuk konfirmasi
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { type, message, onConfirm } = action.payload;
      state.isOpen = true;
      state.type = type || 'alert';
      state.message = message;
      state.onConfirm = onConfirm || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = '';
      state.onConfirm = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;