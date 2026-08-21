'use client';

import { dropOpenModal, getOpenModals } from '@/store/slices/open-modals.slice';
import clsx from 'clsx';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { OPEN_MODAL_INITIAL_Z_INDEX, type ModalElement } from '../../constants/const';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { isEscapeKey } from '../../utils/utils';
import CloseModalButton from '../close-modal-button/close-modal-button';
import s from './modal.module.scss';

// $======================== Modal ========================$ //

type ModalProps = {
  className: string;
  innerClassName?: string;
  name: ModalElement;
  children: ReactNode;
};

export default function Modal(modalProps: ModalProps): React.JSX.Element {
  const { className, innerClassName, name, children } = modalProps;

  const dispatch = useAppDispatch();

  const openModals = useAppSelector(getOpenModals);

  const isOverlayMouseDownRef = useRef(false);

  const modalIndex = openModals.indexOf(name);

  const zIndex = modalIndex === -1 ? undefined : modalIndex + OPEN_MODAL_INITIAL_Z_INDEX;

  const handleClose = () => {
    dispatch(dropOpenModal(name));
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
      dispatch(dropOpenModal(openModals[openModals.length - 1]));
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  useEffect(() => {
    if (openModals.includes(openModals[0])) {
      document.addEventListener('keydown', onEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  });

  return (
    <dialog
      className={clsx(s.modal, className, { [s._open]: openModals.includes(name) })}
      onMouseDown={handleModalMouseDown}
      onClick={handleModalClick}
      style={{ zIndex }}
    >
      <div className={clsx(s.inner, innerClassName)}>
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
