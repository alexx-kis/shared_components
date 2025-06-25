import { ViewportWidth } from '@/constants/const';
import { ICONS } from '@/constants/images';
import { vwm } from '@/utils/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, DragEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import DashedBorder from '../dashed-border/dashed-border';
import './file-field.scss';

// ^======================== FileField ========================^ //

type FileFieldProps = {
  bemClass: string;
  name: string;
  placeholder: string;
  value: File | null;
  onFileFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const initialFileFieldState = { fileName: '', iconSrc: ICONS.addFile };

function FileField(fileFieldProps: FileFieldProps): React.JSX.Element {
  const { bemClass, name, placeholder, value, onFileFieldChange } = fileFieldProps;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [fileFieldState, setFileFieldState] = useState({
    fileName: '',
    iconSrc: ICONS.addFile
  });

  const borderRadius = useRef(0);
  const dasharray = useRef('');

  useEffect(() => {
    borderRadius.current = vwm(8, 8, ViewportWidth.DESKTOP);
    dasharray.current = `${borderRadius.current} ${borderRadius.current}`;
  }, []);

  const handleFileFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileFieldState({
        fileName: file.name,
        iconSrc: ICONS.file
      });
    } else {
      setFileFieldState(initialFileFieldState);
    }
    onFileFieldChange(e);
  };

  const clearFileField = useCallback(() => {
    setFileFieldState(initialFileFieldState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleRemoveButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    clearFileField();

    const syntheticEvent = {
      target: {
        name,
        files: null,
      },
    } as ChangeEvent<HTMLInputElement>;

    onFileFieldChange(syntheticEvent);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (fieldRef.current) {
      fieldRef.current.classList.add('dragover');
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (fieldRef.current) {
      fieldRef.current.classList.remove('dragover');
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      Array.from(e.dataTransfer.files).forEach(file => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  useEffect(() => {
    if (value === null) {
      clearFileField();
    }
  }, [value, clearFileField]);

  return (
    <div
      ref={fieldRef}
      className={clsx(
        `${bemClass} file-field`,
        { '_file-added': fileFieldState.fileName }
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!fileFieldState.fileName &&
        <DashedBorder
          borderRadius={borderRadius.current}
          dasharray={dasharray.current}
          strokeColor='#1818184d'
        />
      }
      <label
        htmlFor='file-field-input'
        className='file-field__label'
      >
        <Image
          className='file-field__icon'
          src={fileFieldState.iconSrc}
          width={24}
          height={24}
          alt=''
        />
        {
          fileFieldState.fileName
            ? <p className='file-field__file-name'>{fileFieldState.fileName}</p>
            : <p className='file-field__placeholder'>{placeholder}</p>
        }
        <button
          type='button'
          className='file-field__remove-button'
          onClick={handleRemoveButtonClick}
        >
          <Image
            src={ICONS.redCross}
            alt=''
            width={12}
            height={12}
          />
        </button>
      </label>
      <input
        type='file'
        className='field__input _file'
        onChange={handleFileFieldChange}
        name={name}
        ref={fileInputRef}
        id='file-field-input'
        disabled={Boolean(fileFieldState.fileName)}
      />
    </div>
  );
}

export default FileField;
