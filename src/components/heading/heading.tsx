import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './heading.module.scss';

// ^======================== Heading ========================^ //

type HeadingType = 'main' | 'regular' | 'small';

interface HeadingProps {
  type?: HeadingType;
  className?: string;
  children: ReactNode;
}

const HEADING_TAG: Record<HeadingType, 'h1' | 'h2' | 'h3'> = {
  main: 'h1',
  regular: 'h2',
  small: 'h3',
};

/**
 * Heading sizes:
 * - `main`: 18px / 16px / 16px
 * - `regular`: 16px / 14px / 14px
 * - `small`: 14px / 14px / 14px
 */

export default function Heading(props: HeadingProps) {
  const { type = 'regular', className, children } = props;

  const Tag = HEADING_TAG[type];

  return <Tag className={clsx(className, s.heading, s[`_${type}`])}>{children}</Tag>;
}
