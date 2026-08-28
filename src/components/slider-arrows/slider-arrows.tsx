'use client';

import { Splide } from '@/lib/splide';
import clsx from 'clsx';
import type { RefObject } from 'react';
import MyImage from '../my-image/image';
import s from './slider-arrows.module.scss';

// ^======================== SliderArrows ========================^ //

type SliderArrowDirection = 'prev' | 'next';

interface SliderArrowsProps {
  classNames: {
    arrows?: string;
    arrow?: string;
    prev?: string;
    next?: string;
  };
  iconSrc: string;
  ref: RefObject<InstanceType<typeof Splide> | null>;
}

export default function SliderArrows(props: SliderArrowsProps) {
  const { classNames, iconSrc, ref: splideRef } = props;

  const handleSliderArrowClick = (direction: SliderArrowDirection) => {
    if (direction === 'prev') {
      splideRef.current?.splide?.go('<');
    } else {
      splideRef.current?.splide?.go('>');
    }
  };

  return (
    <div className={clsx(s['slider-arrows'], classNames.arrows ?? null)}>
      <button
        className={clsx(s.arrow, s._prev, classNames.arrow ?? null, classNames.prev ?? null)}
        type='button'
        onClick={() => handleSliderArrowClick('prev')}
        aria-label='Предыдущий слайд'
      >
        <MyImage src={iconSrc} size={[24]} />
      </button>

      <button
        className={clsx(s.arrow, s._next, classNames.arrow ?? null, classNames.next ?? null)}
        type='button'
        onClick={() => handleSliderArrowClick('next')}
        aria-label='Следующий слайд'
      >
        <MyImage src={iconSrc} size={[24]} />
      </button>
    </div>
  );
}
