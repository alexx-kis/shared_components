import clsx from 'clsx';
import { type ReactNode } from 'react';
import s from './title.module.scss';

// ^======================== Title ========================^ //

type TitleSize = 'xx-large' | 'x-large' | 'large' | 'large-alt' | 'regular' | 'small';

interface TitleProps {
  className?: string;
  size?: TitleSize;
  children: ReactNode;
}

export default function Title(props: TitleProps) {
  const { className, size = 'regular', children } = props;
  return <p className={clsx(s.title, s[`_${size}`], className ?? null)}>{children}</p>;
}
