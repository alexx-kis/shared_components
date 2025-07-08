'use client';

import { useEffect } from 'react';
import { dropOpenElement, getOpenElements } from '../../../store/processes/open-element.process';
import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import { isEscapeKey } from '../../../utils/utils';
import './overlay.scss';

// ^======================== Overlay ========================^ //

type OverlayProps = {
  className: string;
};

function Overlay(overlayProps: OverlayProps): React.JSX.Element {

  const { className } = overlayProps;

  const dispatch = useAppDispatch();
  const openElements = useAppSelector(getOpenElements);

  const onEscKeydown = (e: KeyboardEvent) => {
    if (isEscapeKey(e)) {
      const lastOpenElement = openElements[openElements.length - 1];
      dispatch(dropOpenElement(lastOpenElement));
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  useEffect(() => {
    if (openElements.length !== 0) {
      document.addEventListener('keydown', onEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  });

  const handleOverlayClick = () => {
    const lastOpenElement = openElements[openElements.length - 1];
    dispatch(dropOpenElement(lastOpenElement));
  };

  return (
    <div className={`${className} overlay`} onClick={handleOverlayClick} />
  );
}
export default Overlay;