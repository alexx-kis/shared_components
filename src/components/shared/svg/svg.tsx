import { useEffect, useRef } from 'react';

// ^======================== SVG ========================^ //

type SVGProps = {
  bemClass?: string;
  src: string;
  alt?: string | undefined;
  size: number[];
};

function SVG({ src, alt, bemClass, size }: SVGProps): React.JSX.Element {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const altProp = alt ? alt : '';
  const width = size[0];
  const height = size[1] ?? size[0];

  useEffect(() => {
    if (!imgRef.current) return;

    const replaceWithSvg = async () => {
      try {
        const response = await fetch(src);
        const data = await response.text();
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

        if (!svg) {
          // eslint-disable-next-line no-console
          console.error(`No SVG found in ${src}`);
          return;
        }

        svg.removeAttribute('xmlns:a');

        if (!svg.hasAttribute('viewBox') && svg.hasAttribute('height') && svg.hasAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        if (bemClass) {
          svg.setAttribute('class', bemClass);
        }

        imgRef.current?.replaceWith(svg);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching the SVG:', error);
      }
    };

    replaceWithSvg();
  }, [src, bemClass]);

  return <img className={bemClass} ref={imgRef} src={src} alt={altProp} width={width} height={height} />;
}

export default SVG;
