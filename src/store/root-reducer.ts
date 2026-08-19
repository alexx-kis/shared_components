import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/const';
import { openModalsSlice } from './slices/open-modals.slice';

// %======================== rootReducer ========================% //

export const rootReducer = combineReducers({
  [NameSpace.OPEN_MODALS]: openModalsSlice.reducer,
});
