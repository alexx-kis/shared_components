import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import s from './checkbox.module.scss';

// ^======================== Checkbox ========================^ //

interface CheckboxProps {
  className?: string;
  id: string;
  name: string;
  checked: boolean;
  errorMessage?: string;
  icons: string[];
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const { className, id, name, checked, errorMessage, icons, onCheckboxChange } = props;

  return (
    <div className={clsx(className, s.checkbox, { [s._invalid]: errorMessage })}>
      <input className={s.input} id={id} type='checkbox' name={name} checked={checked} onChange={onCheckboxChange} />

      <div className={s.icon} style={{ backgroundImage: `url(${checked ? icons[1] : icons[0]})` }} />
    </div>
  );
}
