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
  iconSrc: string;
  onRadioButtonChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function RadioButton(radioButtonProps: RadioButtonProps): React.JSX.Element {
  const { className, checked, name, id, value, iconSrc, onRadioButtonChange } = radioButtonProps;

  return (
    <label
      className={clsx(className ?? '', s['radio-button'])}
      style={{
        backgroundImage: `url(${iconSrc}${checked ? 'Checked' : 'Empty'}`,
      }}
    >
      <input type='radio' name={name} onChange={onRadioButtonChange} id={id} checked={checked} value={value} />
    </label>
  );
}
export default RadioButton;
