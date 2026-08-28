import clsx from 'clsx';
import { type ReactNode } from 'react';
import s from './title.module.scss';

// ^======================== Title ========================^ //

type TitleSize = 'x-large' | 'large' | 'regular' | 'small';

interface TitleProps {
  className?: string;
  size?: TitleSize;
  children: ReactNode;
}

/**
 * Title sizes:
 * - `x-large`: 28px / 28px / 28px
 * - `large`: 24px / 18px / 18px
 * - `regular`: 18px / 18px / 16px
 * - `small`: 16px / 14px / 14px
 */

export default function Title(props: TitleProps) {
  const { className, size = 'regular', children } = props;
  return <p className={clsx(s.title, s[`_${size}`], className ?? null)}>{children}</p>;
}
