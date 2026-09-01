'use client';

import MyImage from '@/components/utils/image/image';
import { Splide } from '@/lib/splide';
import clsx from 'clsx';
import { RefObject, useEffect, useRef } from 'react';
import s from './slider-arrows.module.scss';

// ^======================== SliderArrows ========================^ //

type SliderArrowDirection = 'prev' | 'next';

interface SliderArrowsProps {
  classNames?: {
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

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const splide = splideRef.current?.splide;

    if (!splide) return;

    const updateDisabledState = () => {
      const controller = splide.Components.Controller;

      if (prevRef.current) {
        prevRef.current.disabled = controller.getPrev() === -1;
      }

      if (nextRef.current) {
        nextRef.current.disabled = controller.getNext() === -1;
      }
    };

    updateDisabledState();

    splide.on('moved updated resized', updateDisabledState);

    return () => {
      splide.off('moved updated resized', updateDisabledState);
    };
  }, [splideRef]);

  const handleSliderArrowClick = (direction: SliderArrowDirection) => {
    if (direction === 'prev') {
      splideRef.current?.splide?.go('<');
      return;
    }

    splideRef.current?.splide?.go('>');
  };

  return (
    <div className={clsx(s['slider-arrows'], classNames?.arrows ?? null)}>
      <button
        ref={prevRef}
        className={clsx(s.arrow, s._prev, classNames?.arrow ?? null, classNames?.prev ?? null)}
        type='button'
        onClick={() => handleSliderArrowClick('prev')}
        aria-label='Предыдущий слайд'
      >
        <MyImage src={iconSrc} size={[24]} />
      </button>

      <button
        ref={nextRef}
        className={clsx(s.arrow, s._next, classNames?.arrow ?? null, classNames?.next ?? null)}
        type='button'
        onClick={() => handleSliderArrowClick('next')}
        aria-label='Следующий слайд'
      >
        <MyImage src={iconSrc} size={[24]} />
      </button>
    </div>
  );
}
