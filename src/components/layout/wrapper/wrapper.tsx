import type { ReactNode } from 'react';
import './wrapper.scss';

// $======================== Wrapper ========================$ //

type WrapperProps = {
  children: ReactNode;
};

function Wrapper({ children }: WrapperProps): React.JSX.Element {
  return (
    <div className='wrapper'>{children}</div>
  );
}
export default Wrapper;