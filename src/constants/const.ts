// %======================== const ========================% //


// %------------------------ routing ------------------------% //
export enum AppRoute {
  HOME = '/',
};
export const PagesNames = {
  [AppRoute.HOME]: 'Главная',
};

// %------------------------ rendering ------------------------% //
export enum ViewportWidth {
  FULLHD = 1920,
  DESKTOP = 1440,
  TABLET = 834,
  MIDDLE = 577,
  MOBILE = 600,
}

export enum MediaQuery {
  DESKTOP = `(max-width: ${ViewportWidth.DESKTOP}px)`,
  TABLET = `(max-width: ${ViewportWidth.TABLET}px)`,
  MIDDLE = `(max-width: ${ViewportWidth.MIDDLE}px)`,
  MOBILE = `(max-width: ${ViewportWidth.MOBILE}px)`,
}

export enum Ext {
  PNG = '.png',
  WEBP = '.webp',
  SVG = '.svg',
  GIF = '.gif',
  JPEG = '.jpeg',
}

export enum MediaPrefix {
  FULL = '_full',
  DESK = '_desk',
  TAB = '_tab',
  MOB = '_mob',
}

// %------------------------ store ------------------------% //
export enum NameSpace {
  PROCESS = 'PROCESS',
  OPEN_ELEMENTS = 'OPEN_ELEMENTS'
}

export enum OpenElement {
  OPEN_ELEMENT = 'OPEN_ELEMENT',
  ASIDE = 'ASIDE',
}