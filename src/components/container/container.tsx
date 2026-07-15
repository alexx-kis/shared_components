import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './container.module.scss';

// ^======================== Container ========================^ //

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export default function Container(containerProps: ContainerProps): React.JSX.Element {

  const { className, children } = containerProps;

  return (<div className={clsx(className, s.container)}>{children}</div>);
}