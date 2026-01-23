import clsx from 'clsx';
import type { RefObject } from 'react';
import { Ext, MediaPrefix, ViewportWidth } from '../../../constants/const';
import s from './picture.module.scss';

type PictureProps = {
  className?: string;
  src: string;
  size: number[];
  extensions: Ext[];
  alt?: string;
  ref?: RefObject<HTMLElement | null>;
  loading?: 'eager' | 'lazy';
  breakpoints?: MediaPrefix[];
};

const ALL_BREAKPOINTS: MediaPrefix[] = [
  MediaPrefix.FULL,
  MediaPrefix.DESK,
  MediaPrefix.TAB,
  MediaPrefix.MOB,
];

const MEDIA_QUERIES: Record<MediaPrefix, string | undefined> = {
  [MediaPrefix.FULL]: `(min-width: ${ViewportWidth.DESKTOP + 1}px)`,
  [MediaPrefix.DESK]: `(min-width: ${ViewportWidth.TABLET + 1}px)`,
  [MediaPrefix.TAB]: `(min-width: ${ViewportWidth.MIDDLE + 1}px)`,
  [MediaPrefix.MOB]: undefined,
};

const DEFAULT_SIZES = `(min-width: ${ViewportWidth.DESKTOP + 1}px) ${ViewportWidth.FULLHD}px, (min-width: ${ViewportWidth.TABLET + 1}px) ${ViewportWidth.DESKTOP}px, (min-width: ${ViewportWidth.MIDDLE + 1}px) ${ViewportWidth.TABLET}px, 100vw`;

const getMimeType = (ext: Ext) => {
  switch (ext) {
    case Ext.WEBP:
      return 'image/webp';
    case Ext.JPEG:
      return 'image/jpeg';
    case Ext.PNG:
      return 'image/png';
    default:
      return 'image/*';
  }
};

const resolveBreakpointMap = (breakpoints: MediaPrefix[]): Map<MediaPrefix, MediaPrefix> => {
  const map = new Map<MediaPrefix, MediaPrefix>();
  let lastAvailable: MediaPrefix | null = null;

  for (const bp of ALL_BREAKPOINTS) {
    if (breakpoints.includes(bp)) {
      lastAvailable = bp;
    }

    if (lastAvailable) {
      map.set(bp, lastAvailable);
    }
  }

  return map;
};

// $======================== Picture ========================$ //

function Picture(pictureProps: PictureProps): React.JSX.Element {
  const {
    className,
    src: source,
    size,
    extensions,
    alt,
    ref,
    loading = 'lazy',
    breakpoints,
  } = pictureProps;

  const [width, height] = size;

  const fallbackExt = extensions.includes(Ext.PNG) ? Ext.PNG : extensions[0];

  const prioritizedExtensions = [...extensions].sort((a, b) => {
    if (a === Ext.WEBP) return -1;
    if (b === Ext.WEBP) return 1;
    return 0;
  });

  const isResponsive = Array.isArray(breakpoints) && breakpoints.length > 0;

  const resolvedMap = isResponsive
    ? resolveBreakpointMap(breakpoints)
    : new Map<MediaPrefix, MediaPrefix>();

  const lastUsedPrefix = isResponsive ? resolvedMap.get(MediaPrefix.MOB) ?? MediaPrefix.MOB : '';

  return (
    <picture key={source} className={clsx(className, s.picture)} ref={ref}>
      {isResponsive
        ? ALL_BREAKPOINTS.map((bp) => {
          const actualPrefix = resolvedMap.get(bp);
          if (!actualPrefix) return null;

          return prioritizedExtensions.map((ext) => (
            <source
              key={`${bp}-${ext}`}
              srcSet={`${source}${actualPrefix}${ext}`}
              type={ext === Ext.SVG ? 'image/svg+xml' : getMimeType(ext)}
              media={MEDIA_QUERIES[bp]}
              sizes={DEFAULT_SIZES}
            />
          ));
        })
        : prioritizedExtensions.map((ext) => {
          const src = `${source}${ext}`;
          return (
            <source
              key={src}
              srcSet={src}
              type={ext === Ext.SVG ? 'image/svg+xml' : getMimeType(ext)}
            />
          );
        })}

      <img
        className={s.image}
        src={
          isResponsive
            ? `${source}${lastUsedPrefix}${fallbackExt}`
            : `${source}${fallbackExt}`
        }
        alt={alt ?? ''}
        width={width}
        height={height ?? width}
        loading={loading}
        sizes={isResponsive ? DEFAULT_SIZES : undefined}
      />
    </picture>
  );
}

export default Picture;