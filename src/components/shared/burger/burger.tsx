import { OpenElement } from '@/constants/const';
import { ICONS } from '@/constants/images';
import { addOpenElement } from '@/store/processes/open-element.process';
import { useAppDispatch } from '@/store/store-hooks';
import Image from 'next/image';
import './burger.scss';

// ^======================== Burger ========================^ //

type BurgerProps = {
  bemClass: string;
};

function Burger(burgerProps: BurgerProps): React.JSX.Element {
  const { bemClass } = burgerProps;
  const dispatch = useAppDispatch();

  const handleBurgerClick = () => {
    dispatch(addOpenElement(OpenElement.ASIDE));
  };

  return (
    <button
      type='button'
      className={`${bemClass} burger`}
      onClick={handleBurgerClick}
    >
      <Image
        className='burger__icon'
        src={ICONS.burger}
        alt='open menu'
        width={28}
        height={28}
      />
    </button>
  );
}
export default Burger;