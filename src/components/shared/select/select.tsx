import clsx from 'clsx';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import './select.scss';
import SVG from '../svg/svg';

// ^======================== Select ========================^ //

type SelectProps = {
  bemClass: string;
  iconSrc: string;
  iconSize: number;
  options: string[];
  name: string;
  value: string;
  placeholder: string;
  onSelectChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function Select(selectProps: SelectProps): React.JSX.Element {

  const { bemClass, iconSrc, iconSize, options, name, onSelectChange, value, placeholder } = selectProps;

  const [isOpen, setIsOpen] = useState(false);
  const [headerText, setHeaderText] = useState(placeholder);

  const selectBodyRef = useRef<HTMLDivElement | null>(null);

  const openSelect = () => {
    selectBodyRef.current!.style.maxHeight = `${selectBodyRef.current!.scrollHeight + 1}px`;
    setIsOpen(true);
  };

  const closeSelect = () => {
    selectBodyRef.current!.style.maxHeight = '0px';
    setIsOpen(false);
  };

  const handleSelectHeaderClick = () => {
    if (isOpen) {
      closeSelect();
    } else {
      openSelect();
    }
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      if (isOpen) {
        closeSelect();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isOpen]);

  useEffect(() => {
    if (value) {
      setHeaderText(value);
    } else {
      setHeaderText(placeholder);
    }

  }, [value, placeholder]);

  return (
    <div
      className={clsx(
        `select ${bemClass}`,
        { '_active': isOpen },
        { '_selected': headerText !== placeholder }
      )}
    >
      <div className='select__header' onClick={handleSelectHeaderClick}>
        <p className='select__header-text'>{headerText}</p>
        <SVG
          bemClass='select__header-icon'
          src={iconSrc}
          size={[iconSize]}
        />
      </div>
      <div className='select__body' ref={selectBodyRef}>
        <ul className='select__list'>
          {options.map((option) =>
            <li key={option} className='select__item'>
              <label
                className='select__label'
                onClick={closeSelect}
              >
                <input
                  className='select__input'
                  type='radio'
                  name={name}
                  value={option}
                  checked={option === value}
                  onChange={onSelectChange}
                />
                {option}
              </label>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Select;