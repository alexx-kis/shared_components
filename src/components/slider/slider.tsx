'use client';

import { Splide, SplideSlide, SplideTrack } from '@/lib/splide';
import '@splidejs/react-splide/css/core';
import clsx from 'clsx';
import { type RefObject } from 'react';
import s from './slider.module.scss';

// $======================== Slider ========================$ //

interface SliderProps<S> {
  className?: string;
  slideClassName?: string;
  sliderRef?: RefObject<InstanceType<typeof Splide> | null>;
  renderSlide: (slide: S, index?: number) => React.ReactNode;
  data: S[];
  options?: {
    perPage?: number;
    gap?: number;
  };
}

export default function Slider<S>(props: SliderProps<S>) {
  const { className, slideClassName, sliderRef, renderSlide, data, options } = props;
  return (
    <Splide
      ref={sliderRef}
      className={clsx(s.slider, className ?? null)}
      options={{
        autoWidth: true,
        arrows: false,
        pagination: false,
        ...options,
      }}
      hasTrack={false}
    >
      <SplideTrack className={s['slider-track']}>
        {data.map((slide, index) => (
          <SplideSlide key={index} className={clsx(s.slide, slideClassName ?? null)}>
            {renderSlide(slide, index)}
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
}
