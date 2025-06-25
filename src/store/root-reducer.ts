import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/general-constants';
import { openElementProcess } from './processes/open-element.process';

// %======================== rootReducer ========================% //

export const rootReducer = combineReducers({
  [NameSpace.OPEN_ELEMENTS]: openElementProcess.reducer,
});