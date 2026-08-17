'use client';

import Image from 'next/image';

// ^======================== MyImage ========================^ //

type MyImageProps = {
  src: string;
  className?: string;
  size: [number, number] | [number] | 'fill';
  alt?: string;
};

export default function MyImage(myImageProps: MyImageProps) {
  const { src, className, size, alt } = myImageProps;
  const isSizeFill = size === 'fill';

  return (
    <Image
      className={className ?? ''}
      src={src}
      alt={alt ?? ''}
      fill={isSizeFill ?? undefined}
      width={isSizeFill ? undefined : size[0]}
      height={isSizeFill ? undefined : (size[1] ?? size[0])}
      loading='eager'
    />
  );
}
