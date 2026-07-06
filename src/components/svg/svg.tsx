'use client';

import { CSSProperties, useEffect, useState } from 'react';

// ^======================== Svg ========================^ //

type SvgProps = {
  className?: string;
  src: string;
  alt?: string;
  size: readonly [number, number?];
};

const svgCache = new Map<string, Promise<string>>();

const getSvgText = (src: string): Promise<string> => {
  const cachedSvg = svgCache.get(src);

  if (cachedSvg) return cachedSvg;

  const svgPromise = fetch(src).then((response) => response.text());

  svgCache.set(src, svgPromise);

  return svgPromise;
};

export default function Svg(props: SvgProps): React.JSX.Element {
  const { className, src, alt = '', size } = props;

  const [svgMarkup, setSvgMarkup] = useState<string>('');

  const width = size[0];
  const height = size[1] ?? size[0];

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    width,
    height,
    flexShrink: 0,
    lineHeight: 0,
  };

  useEffect(() => {
    let isMounted = true;

    const loadSvg = async (): Promise<void> => {
      try {
        const data = await getSvgText(src);
        const parser = new DOMParser();
        const document = parser.parseFromString(data, 'image/svg+xml');
        const svg = document.querySelector('svg');

        if (!svg) return;

        svg.removeAttribute('xmlns:a');

        if (!svg.hasAttribute('viewBox') && svg.hasAttribute('width') && svg.hasAttribute('height')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        svg.setAttribute('width', String(width));
        svg.setAttribute('height', String(height));

        svg.style.display = 'block';
        svg.style.width = '100%';
        svg.style.height = '100%';

        if (className) {
          svg.setAttribute('class', className);
        }

        if (alt) {
          svg.setAttribute('role', 'img');
          svg.setAttribute('aria-label', alt);
        } else {
          svg.setAttribute('aria-hidden', 'true');
        }

        if (!isMounted) return;

        setSvgMarkup(svg.outerHTML);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading SVG:', error);
      }
    };

    loadSvg();

    return () => {
      isMounted = false;
    };
  }, [src, className, alt, width, height]);

  return <span style={wrapperStyle} dangerouslySetInnerHTML={{ __html: svgMarkup }} />;
}
