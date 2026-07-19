import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/const';
import { openElementProcess } from './slices/open-element.slice';

// %======================== rootReducer ========================% //

export const rootReducer = combineReducers({
  [NameSpace.OPEN_ELEMENTS]: openElementProcess.reducer,
});