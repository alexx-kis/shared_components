import { ICONS } from '@/constants/images';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';
import Checkbox from '../checkbox/checkbox';
import s from './checkbox-element.module.scss';

// ^======================== CheckboxElement ========================^ //

interface CheckboxElementProps {
  className?: string;
  id: string;
  name: string;
  checked: boolean;
  children: ReactNode;
  errorText?: string;
  onCheckboxElementChange?: (checked: boolean) => void;
}

export default function CheckboxElement(props: CheckboxElementProps) {
  const { className, id, name, checked, children, errorText, onCheckboxElementChange } = props;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked: isChecked } = event.target;

    onCheckboxElementChange?.(isChecked);
  };

  return (
    <label className={clsx(className, s['checkbox-element'])} htmlFor={id}>
      <Checkbox
        className={s.checkbox}
        id={id}
        name={name}
        checked={checked}
        errorMessage={errorText}
        onCheckboxChange={handleCheckboxChange}
        icons={[ICONS.checkboxEmpty, ICONS.checkboxChecked]}
      />

      <span className={s.legend}>{children}</span>
      {/* {errorText && <ErrorMessage className={s.error} text={errorText} />} */}
    </label>
  );
}
