import type { RefObject } from 'react';
import { Ext, MediaPrefix, ViewportWidth } from '../../../constants/general-constants';
import './picture.scss';

// ^======================== Picture ========================^ //

type PictureProps = {
  bemClass?: string;
  src: string;
  size: number[];
  extensions: Ext[];
  alt?: string;
  ref?: RefObject<HTMLElement | null>;
  loading?: 'eager' | 'lazy' | undefined;
  responsive?: boolean;
};

const MEDIA_CONFIG: { prefix: MediaPrefix; media?: string; }[] = [
  { prefix: MediaPrefix.FULL, media: `(min-width: ${ViewportWidth.DESKTOP + 1}px)` },
  { prefix: MediaPrefix.DESK, media: `(min-width: ${ViewportWidth.TABLET + 1}px)` },
  { prefix: MediaPrefix.TAB, media: `(min-width: ${ViewportWidth.MIDDLE + 1}px)` },
  { prefix: MediaPrefix.MOB, media: undefined },
];

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

function Picture(pictureProps: PictureProps): React.JSX.Element {

  const { bemClass, src: source, size, extensions, alt, ref, loading = 'lazy', responsive = false } = pictureProps;

  const [width, height] = size;

  const fallbackExt = extensions.includes(Ext.PNG) ? Ext.PNG : extensions[0];

  const prioritizedExtensions = [...extensions].sort((a, b) => {
    if (a === Ext.WEBP) return -1;
    if (b === Ext.WEBP) return 1;
    return 0;
  });

  const DEFAULT_SIZES = `(min-width: ${ViewportWidth.DESKTOP + 1}px) ${ViewportWidth.FULLHD}px, (min-width: ${ViewportWidth.TABLET + 1}px) ${ViewportWidth.DESKTOP}px, (min-width: ${ViewportWidth.MIDDLE + 1}px) ${ViewportWidth.TABLET}px, 100vw`;

  return (
    <picture key={source} className={bemClass ?? ''} ref={ref}>
      {responsive
        ? MEDIA_CONFIG.map(({ prefix, media }) =>
          prioritizedExtensions.map((ext) => (
            <source
              key={`${prefix}-${ext}`}
              srcSet={`${source}${prefix}${ext}`}
              type={ext === Ext.SVG ? 'image/svg+xml' : getMimeType(ext)}
              media={media}
              sizes={responsive ? DEFAULT_SIZES : undefined}
            />
          ))
        )
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
        src={
          responsive
            ? `${source}${MediaPrefix.MOB}${fallbackExt}`
            : `${source}${fallbackExt}`
        }
        alt={alt ?? ''}
        width={width}
        height={height ?? width}
        loading={loading}
        sizes={responsive ? DEFAULT_SIZES : undefined}
      />
    </picture>
  );
}

export default Picture;