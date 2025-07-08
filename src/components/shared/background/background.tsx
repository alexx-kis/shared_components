import { CSSProperties, ReactNode, Ref } from 'react';
import './background.scss';

// ^======================== Background ========================^ //

type BackgroundProps = {
  className: string;
  style: CSSProperties;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

function Background(backgroundProps: BackgroundProps): React.JSX.Element {

  const { className, style, children, ref } = backgroundProps;

  return (
    <div
      className={`${className} background`}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
}
export default Background;