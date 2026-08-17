import clsx from 'clsx';
import { ReactNode } from 'react';
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

export default function Heading(props: HeadingProps) {
  const { type = 'regular', className, children } = props;

  const Tag = HEADING_TAG[type];

  return <Tag className={clsx(className, s.heading, s[`_${type}`])}>{children}</Tag>;
}
