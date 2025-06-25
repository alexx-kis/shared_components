import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { OpenElement } from '../../../constants/general-constants';
import { dropOpenElement, getOpenElements } from '../../../store/processes/open-element.process';
import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import Overlay from '../overlay/overlay';
import './modal.scss';

// ^======================== Modal ========================^ //

type ModalProps = {
  className: string;
  name: OpenElement;
  children: ReactNode;
  closeButtonIconSrc?: string;
  onCloseButtonClick?: () => void;
};

function Modal(modalProps: ModalProps): React.JSX.Element {

  const { className, name, children, closeButtonIconSrc, onCloseButtonClick } = modalProps;
  const openElements = useAppSelector(getOpenElements);
  const isModalOpen = openElements.includes(name);
  const dispatch = useAppDispatch();

  const handleCloseButtonClick = () => {
    dispatch(dropOpenElement(name));
    onCloseButtonClick?.();
  };

  return (
    <dialog
      className={clsx(
        `${className} modal`,
        { '_open': isModalOpen }
      )}
    >
      <Overlay
        bemClass={clsx(
          'modal__overlay',
          { '_visible': isModalOpen }
        )}
      />
      {closeButtonIconSrc && (
        <button
          className='modal__close-button'
          onClick={handleCloseButtonClick}
        >
          <img
            src={closeButtonIconSrc}
            alt=''
            width={40}
            height={40}
          />
        </button>
      )}
      {children}
    </dialog>
  );
}
export default Modal;