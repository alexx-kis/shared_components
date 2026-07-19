import { type CSSProperties, type ReactNode, type Ref } from 'react';
import s from './background.module.scss'
import clsx from 'clsx';

// ^======================== Background ========================^ //

type BackgroundProps = {
  className: string;
  style: CSSProperties;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

export default function Background(backgroundProps: BackgroundProps): React.JSX.Element {

  const { className, style, children, ref } = backgroundProps;

  return (
    <div
      className={clsx(className, s.background)}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
}