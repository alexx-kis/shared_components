import clsx from 'clsx';
import s from './checkbox.module.scss';

// ^======================== Checkbox ========================^ //

type CheckboxProps = {
  className?: string;
  name: string;
  checked: boolean;
  errorMessage?: string;
  onCheckboxChange: (value: boolean) => void;
  icons: {
    empty: string;
    checked: string;
  };
};

function Checkbox(checkboxProps: CheckboxProps): React.JSX.Element {

  const { className, name, checked, errorMessage, onCheckboxChange, icons } = checkboxProps;
  const iconSrc = checked ? icons.checked : icons.empty;

  const handleCheckboxChange = () => onCheckboxChange(!checked);

  return (
    <div
      className={clsx(className, s.checkbox,
        { '_invalid': errorMessage }
      )}
    >
      <label className={s.label}>
        <input
          type='checkbox'
          name={name}
          onChange={handleCheckboxChange}
        />
        <span className={s.icon}
          style={{ backgroundImage: `url(${iconSrc})` }}
        >
        </span>
      </label>
    </div>
  );
}
export default Checkbox;