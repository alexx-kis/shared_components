import type { AxiosInstance } from 'axios';
import type { store } from './store';

// %======================== redux types ========================% //

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppAsyncThunk = {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
};

// %------------------------ slices ------------------------% //
export type OpenModalsSlice = {
  openModals: (string | null)[];
};
