'use client';

import clsx from 'clsx';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import SVG from '../svg/svg';
import s from './select.module.scss';

// ^======================== Select ========================^ //

type SelectProps = {
  classNames: {
    main?: string;
    header?: string;
    value?: string;
    icon?: string;
    body?: string;
    options?: string;
    option?: string;
  };
  iconSrc: string;
  iconSize: number;
  options: string[];
  name: string;
  value: string;
  placeholder: string;
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Select(selectProps: SelectProps): React.JSX.Element {

  const { classNames, iconSrc, iconSize, options, name, onSelectChange, value, placeholder } = selectProps;

  const [isOpen, setIsOpen] = useState(false);
  const [headerText, setHeaderText] = useState(placeholder);

  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectBodyRef = useRef<HTMLDivElement | null>(null);

  const openSelect = () => {
    setIsOpen(true);

    const body = selectBodyRef.current;
    if (!body) return;

    body.style.maxHeight = `${body.scrollHeight + 1}px`;
  };

  const closeSelect = () => {
    setIsOpen(false);

    const body = selectBodyRef.current;
    if (!body) return;

    body.style.maxHeight = '0px';
  };

  const handleSelectHeaderClick = () => {
    if (isOpen) return closeSelect();
    openSelect();
  };

  useEffect(() => {
    const handleDocumentPointerDown = (e: PointerEvent) => {
      if (!isOpen) return;

      const root = selectRef.current;
      if (!root) return;

      const target = e.target;
      if (!(target instanceof Node)) return;

      if (root.contains(target)) return;

      closeSelect();
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    return () => document.removeEventListener('pointerdown', handleDocumentPointerDown);
  }, [isOpen]);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeaderText(e.target.value);
    onSelectChange(e);
    closeSelect();
  };

  useEffect(() => {
    if (value) {
      setHeaderText(value);
      return;
    }

    setHeaderText(placeholder);
  }, [value, placeholder]);

  return (
    <div
      className={clsx(classNames.main, s.select,
        { [s._active]: isOpen },
        { [s._selected]: headerText !== placeholder }
      )}
      ref={selectRef}
    >
      <button
        type='button'
        className={clsx(s.header, classNames.header)}
        onClick={handleSelectHeaderClick}
        aria-expanded={isOpen}>
        <span className={clsx(s.value, classNames.value)}>{headerText}</span>
        <SVG
          className={clsx(s.icon, classNames.icon)}
          src={iconSrc}
          size={[iconSize]}
        />
      </button>
      <div className={clsx(s.body, classNames.body)} ref={selectBodyRef}>
        <div className={clsx(s.options, classNames.options)}>
          {options.map((option, index) =>
            <label
              key={`${option}-${index}`}
              className={clsx(s.option, classNames.option)}
            >
              <input
                className={s.input}
                type='radio'
                name={name}
                value={option}
                checked={option === value}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
export default Select;