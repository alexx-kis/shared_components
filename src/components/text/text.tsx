import clsx from 'clsx';
import { ReactNode } from 'react';
import s from './text.module.scss';

// ^======================== Text ========================^ //

type TextSize = 'large' | 'regular' | 'small';

interface TextProps {
  className?: string;
  size?: TextSize;
  children: ReactNode;
}

export default function Text(props: TextProps) {
  const { className, size = 'regular', children } = props;
  return <p className={clsx(s.text, s[`_${size}`], className ?? null)}>{children}</p>;
}
