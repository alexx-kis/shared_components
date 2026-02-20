'use client';

import clsx from 'clsx';
import { type ReactElement, type ReactNode, useEffect, useState } from 'react';
import type { OpenElement } from '../../constants/const';
import { getOpenElements } from '../../store/processes/open-element.process';
import { useAppSelector } from '../../store/store-hooks';
import Overlay from '../overlay/overlay';
import s from './modal.module.scss';

// $======================== Modal ========================$ //

const OPEN_MODAL_INITIAL_Z_INDEX = 100;

type ModalProps = {
  className: string;
  name: OpenElement;
  children: ReactNode;
  closeButton?: ReactElement;
};

function Modal(modalProps: ModalProps): React.JSX.Element {

  const { className, children, name, closeButton } = modalProps;

  const openElements = useAppSelector(getOpenElements);
  const isModalOpen = openElements.includes(name);
  const [zIndex, setZIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (openElements.indexOf(name) === -1) {
      setZIndex(undefined);
    } else {
      setZIndex((openElements.indexOf(name) + OPEN_MODAL_INITIAL_Z_INDEX));
    }
  }, [openElements, name]);

  return (
    <dialog
      className={clsx(s.modal, className, { [s._open]: isModalOpen })}
      style={{ zIndex: zIndex }}
    >
      <Overlay
        className={clsx(s.overlay,
          { '_visible': isModalOpen }
        )}
      />
      {closeButton}
      {children}
    </dialog>
  );
}
export default Modal;