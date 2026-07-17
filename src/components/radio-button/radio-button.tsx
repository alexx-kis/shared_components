import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import s from './radio-button.module.scss';

// ^======================== RadioButton ========================^ //

type RadioButtonProps = {
  className?: string;
  checked?: boolean;
  name: string;
  id?: string;
  value: string;
  iconSrcs: string[];
  onRadioButtonChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButton(radioButtonProps: RadioButtonProps): React.JSX.Element {
  const { className, checked, name, id, value, iconSrcs, onRadioButtonChange } = radioButtonProps;

  return (
    <label
      className={clsx(className ?? '', s['radio-button'])}
      style={{
        backgroundImage: `url(${checked ? iconSrcs[1] : iconSrcs[0]}`,
      }}
    >
      <input type='radio' name={name} onChange={onRadioButtonChange} id={id} checked={checked} value={value} />
    </label>
  );
}
