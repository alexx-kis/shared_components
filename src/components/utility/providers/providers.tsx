import { Provider } from 'react-redux';
import { store } from '../../../store/store';

// ^======================== Providers ========================^ //

export default function Providers({ children }: { children: React.ReactNode; }): React.JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}