// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/reducers/modalSlice';

const ModalGlobal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message, onConfirm } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    // Panggil callback jika ada
    if (onConfirm && typeof onConfirm === 'function') {
      onConfirm();
    }
    dispatch(closeModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={type === 'alert' ? handleClose : undefined} // alert bisa close di backdrop, confirm tidak
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-5 text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-2">
          {type === 'confirm' ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Konfirmasi
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalGlobal;