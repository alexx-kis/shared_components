import clsx from 'clsx';
import s from './switcher.module.scss';

// ^======================== Switcher ========================^ //

interface SwitcherProps {
  className?: string;
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Switcher(switcherProps: SwitcherProps) {
  const { className, active, disabled, onClick } = switcherProps;

  return (
    <button
      type='button'
      className={clsx(className ?? '', s.switcher, {
        [s._active]: active,
        [s._disabled]: disabled,
      })}
      onClick={onClick}
    >
      <div className={s.handler} />
    </button>
  );
}
