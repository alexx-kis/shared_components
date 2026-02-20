import type { ReactNode } from 'react';
import s from './wrapper.module.scss'

// $======================== Wrapper ========================$ //

type WrapperProps = {
  children: ReactNode;
};

function Wrapper({ children }: WrapperProps): React.JSX.Element {
  return (
    <div className={s.wrapper}>{children}</div>
  );
}
export default Wrapper;