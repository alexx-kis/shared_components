import { AppRoute } from './enums';

// %======================== const ========================% //

export const PREFIX = '';
export const OPEN_MODAL_INITIAL_Z_INDEX = 100;

// %------------------------ routing ------------------------% //

export const PagesNames = {
  [AppRoute.HOME]: 'Главная',
};

// %------------------------ api ------------------------% //
// export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? ''; // NEXTJS
export const BACKEND_URL = import.meta.env.VITE_API_PATH; // VITE
export const REQUEST_TIMEOUT = 5000;
export const COOKIE_LABEL_TIMEOUT = 3000;
export const COOKIE_NAME = 'cookiesAccepted';
