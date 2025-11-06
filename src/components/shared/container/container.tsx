import clsx from 'clsx';
import type { ReactNode } from 'react';
import s from './container.module.scss';

// ^======================== Container ========================^ //

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

function Container(containerProps: ContainerProps): React.JSX.Element {

  const { className, children } = containerProps;

  return (<div className={clsx(className, s.container)}>{children}</div>);
}
export default Container;