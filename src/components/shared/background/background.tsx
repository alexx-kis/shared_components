import { ReactNode, Ref } from 'react';
import './background.scss';

// ^======================== Background ========================^ //

type BackgroundProps = {
  bemClass: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

function Background(backgroundProps: BackgroundProps): React.JSX.Element {

  const { bemClass, children, ref } = backgroundProps;

  return (
    <div
      className={`${bemClass} background`}
      ref={ref}
    >
      {children}
    </div>
  );
}
export default Background;