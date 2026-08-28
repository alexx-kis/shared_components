import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './text.module.scss';

// ^======================== Text ========================^ //

type TextSize = 'large' | 'regular' | 'small';

interface TextProps {
  className?: string;
  size?: TextSize;
  children: ReactNode;
}

/**
 * Text sizes:
 * - `large`: 18px / 16px / 16px
 * - `regular`: 16px / 14px / 14px
 * - `small`: 14px / 14px / 14px
 */

export default function Text(props: TextProps) {
  const { className, size = 'regular', children } = props;
  return <p className={clsx(s.text, s[`_${size}`], className ?? null)}>{children}</p>;
}
