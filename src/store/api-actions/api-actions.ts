import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppAsyncThunk } from '../store-types';

// %======================== api-actions ========================% //

export const doAsyncAction = createAsyncThunk<
  void,
  undefined,
  AppAsyncThunk
>('domain/doAsyncAction', async (_arg, { extra: api }) => {
  const { data } = await api.get('API_Route.SomeAddress');
  return data;
});
