import clsx from 'clsx';
import { ICONS } from '../../../constants/images';
import './checkbox.scss';

// ^======================== Checkbox ========================^ //

type CheckboxProps = {
  bemClass: string;
  name: string;
  text: string;
  checked: boolean;
  errorMessage?: string;
  onCheckboxChange: (value: boolean) => void;
};

function Checkbox(checkboxProps: CheckboxProps): React.JSX.Element {

  const { bemClass, name, text, checked, errorMessage, onCheckboxChange } = checkboxProps;
  const iconBg = checked ? `url(${ICONS.checkboxChecked})` : `url(${ICONS.checkboxEmpty})`;

  const handleCheckboxChange = () => {
    onCheckboxChange(!checked);
  };

  return (
    <div
      className={clsx(
        `${bemClass} checkbox`,
        { '_invalid': errorMessage }
      )}
    >
      <label className='checkbox__label'>
        <input
          type='checkbox'
          name={name}
          onChange={handleCheckboxChange}
        />
        <span className='checkbox__icon'
          style={{
            backgroundImage: `${iconBg}`
          }}
        >
        </span>
        <span className='checkbox__text'>{text}</span>
      </label>
    </div>
  );
}
export default Checkbox;