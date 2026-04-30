'use client';

import clsx from 'clsx';

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { OPEN_MODAL_INITIAL_Z_INDEX, type OpenElement } from '../../constants/const';
import { dropOpenElement, getOpenElements } from '../../store/slices/open-element.process';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { isEscapeKey } from '../../utils/utils';
import CloseModalButton from '../close-modal-button/close-modal-button';
import s from './modal.module.scss';

// $======================== Modal ========================$ //

type ModalProps = {
  className: string;
  name: OpenElement;
  children: ReactNode;
};

export default function Modal(modalProps: ModalProps): React.JSX.Element {
  const { className, name, children } = modalProps;

  const dispatch = useAppDispatch();
  const openElements = useAppSelector(getOpenElements);

  const [zIndex, setZIndex] = useState<number | undefined>(undefined);

  const isOverlayMouseDownRef = useRef(false);

  const handleClose = () => {
    dispatch(dropOpenElement(name));
  };

  const handleModalMouseDown = (e: MouseEvent<HTMLDialogElement>) => {
    isOverlayMouseDownRef.current = e.target === e.currentTarget;
  };

  const handleModalClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (!isOverlayMouseDownRef.current) return;
    if (e.target !== e.currentTarget) return;

    handleClose();
  };

  const onEscKeydown = (e: KeyboardEvent) => {
    if (isEscapeKey(e)) {
      dispatch(dropOpenElement(openElements[openElements.length - 1]));
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  useEffect(() => {
    if (openElements.includes(openElements[0])) {
      document.addEventListener('keydown', onEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  });

  useEffect(() => {
    if (openElements.indexOf(name) === -1) {
      setZIndex(undefined);
    } else {
      setZIndex(openElements.indexOf(name) + OPEN_MODAL_INITIAL_Z_INDEX);
    }
  }, [openElements, name]);

  return (
    <dialog className={clsx(s.modal, { [s._open]: openElements.includes(name) })} onMouseDown={handleModalMouseDown} onClick={handleModalClick} style={{ zIndex: zIndex }}>
      <div className={clsx(s.inner, className)}>
        <CloseModalButton 
        className={s['close-button']} 
          onCloseModalButtonClick={handleClose} 
          iconSrc=''
          iconSize={[24, 24]}
        />
        {children}
      </div>
    </dialog>
  );
}
