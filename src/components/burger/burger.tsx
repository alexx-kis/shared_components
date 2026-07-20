import { OpenElement } from '@/constants/const';
import { ICONS } from '@/constants/images';
import { addOpenElement } from '@/store/slices/open-element.slice';
import { useAppDispatch } from '@/store/store-hooks';
import clsx from 'clsx';
import s from './burger.module.scss';

// ^======================== Burger ========================^ //

type BurgerProps = {
  className: string;
};

export default function Burger(burgerProps: BurgerProps): React.JSX.Element {
  const { className } = burgerProps;
  const dispatch = useAppDispatch();

  const handleBurgerClick = () => {
    dispatch(addOpenElement(OpenElement.ASIDE));
  };

  return (
    <button type='button' className={clsx(s.burger, className)} onClick={handleBurgerClick}>
      <img className={s.icon} src={ICONS.burger} alt='open menu' width={28} height={28} />
    </button>
  );
}
