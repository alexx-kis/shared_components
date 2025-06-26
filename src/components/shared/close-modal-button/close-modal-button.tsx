
import type { OpenElement } from '../../../constants/const';
import { dropOpenElement } from '../../../store/processes/open-element.process';
import { useAppDispatch } from '../../../store/store-hooks';
import './close-modal-button.scss';

// ^======================== CloseModalButton ========================^ //

type CloseModalButtonProps = {
  className: string;
  iconSrc: string;
  iconSize: [number, number];
  modalName: OpenElement;
  onCloseModalButtonClick?: () => void;
};

function CloseModalButton(closeModalButtonProps: CloseModalButtonProps): React.JSX.Element {

  const { className, iconSrc, iconSize: [width, height], modalName, onCloseModalButtonClick } = closeModalButtonProps;

  const dispatch = useAppDispatch();

  const handleCloseModalButtonClick = () => {
    dispatch(dropOpenElement(modalName));
    onCloseModalButtonClick?.();    
  };

  return (
    <button
      type='button'
      className={`${className} close-modal-button`}
      onClick={handleCloseModalButtonClick}
    >
      {/* Image or img */}
      <img
        src={iconSrc}
        alt=''
        width={width}
        height={height}
      />
    </button>
  );
}
export default CloseModalButton;