import './dashed-border.scss';

// ^======================== DashedBorder ========================^ //

import { useEffect, useRef } from 'react';

type DashedBorderProps = {
  borderRadius: number;
  dasharray: string;
  strokeColor: string;
};

function DashedBorder(dashedBorderProps: DashedBorderProps): React.JSX.Element {

  const { borderRadius, dasharray, strokeColor } = dashedBorderProps;

  const dashedBorderRef = useRef<HTMLDivElement | null>(null);

  const createSvg = () => {
    if (!dashedBorderRef.current) return;
    const width = dashedBorderRef.current.clientWidth;
    const height = dashedBorderRef.current.clientHeight;
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="${width}" 
      height="${height}" 
      viewBox="0 0 ${width + 1} ${height + 1}" 
      fill="none">
  
        <rect 
        x="0.5" 
        y="0.5"
        width="${width}" 
        height="${height}" 
        rx="${borderRadius}" 
        stroke="${strokeColor}" 
        stroke-dasharray="${dasharray}"/>
  
      </svg>`;

    const encodedSvg = encodeURIComponent(svgString)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

    dashedBorderRef.current.style.backgroundImage = `url('data:image/svg+xml,${encodedSvg}')`;

    if (dashedBorderRef.current.parentElement) {
      dashedBorderRef.current.parentElement.style.position = 'relative';
    }
  };

  useEffect(() => {
    createSvg();

    const handleResize = () => createSvg();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      className='dashed-border'
      ref={dashedBorderRef}
    >
    </div>
  );
}
export default DashedBorder;