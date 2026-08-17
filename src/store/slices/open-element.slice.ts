import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import type { OpenModalsSlice } from '../store-types';

// %======================== openModalsSlice ========================% //

const initialState: OpenModalsSlice = {
  openModals: [],
};

export const openModalsSlice = createSlice({
  name: NameSpace.OPEN_MODALS,
  initialState,
  reducers: {
    addOpenModal: (state, action: PayloadAction<string>) => {
      if (state.openModals.includes(action.payload)) return;
      state.openModals.push(action.payload);
      document.body.style.overflow = 'hidden';
    },
    dropOpenModal: (state, action) => {
      const index = state.openModals.indexOf(action.payload);
      if (index !== -1) {
        state.openModals.splice(index, 1);
      }
      document.body.style.overflow = '';
    },
  },
  selectors: {
    getOpenModals: (state) => state.openModals,
  },
});

export const { addOpenModal, dropOpenModal } = openModalsSlice.actions;

export const { getOpenModals } = openModalsSlice.selectors;
