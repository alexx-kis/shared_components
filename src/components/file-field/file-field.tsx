import { ICONS } from '@/constants/images';
import clsx from 'clsx';
import { type ChangeEvent, type DragEvent, type MouseEvent, useEffect, useRef } from 'react';
import DashedBorder from '../dashed-border/dashed-border';
import s from './file-field.module.scss';

// ^======================== FileField ========================^ //

type FileFieldProps = {
  className: string;
  name: string;
  placeholder: string;
  value: File | null;
  onFileFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const BORDER_RADIUS = 8;
const DASHARRAY = `${BORDER_RADIUS} ${BORDER_RADIUS}`;

export default function FileField(fileFieldProps: FileFieldProps): React.JSX.Element {
  const { className, name, placeholder, value, onFileFieldChange } = fileFieldProps;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const fileName = value?.name ?? '';
  const iconSrc = value ? ICONS.file : ICONS.addFile;

  const handleFileFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onFileFieldChange(e);
  };

  const handleRemoveButtonClick = (e: MouseEvent) => {
    e.stopPropagation();

    const input = fileInputRef.current;
    if (input) {
      input.value = '';
    }

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

    const field = fieldRef.current;
    if (!field) return;

    field.classList.add('dragover');
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();

    const field = fieldRef.current;
    if (!field) return;

    field.classList.remove('dragover');
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const input = fileInputRef.current;
    if (!input) return;

    const dataTransfer = new DataTransfer();

    Array.from(e.dataTransfer.files).forEach((file) => {
      dataTransfer.items.add(file);
    });

    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  useEffect(() => {
    if (value !== null) return;

    const input = fileInputRef.current;
    if (!input) return;

    input.value = '';
  }, [value]);

  return (
    <div
      ref={fieldRef}
      className={clsx(className, s['file-field'], {
        [s['_file-added']]: fileName,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!fileName && <DashedBorder borderRadius={BORDER_RADIUS} dasharray={DASHARRAY} strokeColor='#1818184d' />}

      <label htmlFor='file-field-input' className={s.label}>
        <img className={s.icon} src={iconSrc} width={24} height={24} alt='' />

        {fileName ? <p className={s['file-name']}>{fileName}</p> : <p className={s.placeholder}>{placeholder}</p>}

        <button type='button' className={s['remove-button']} onClick={handleRemoveButtonClick}>
          <img src={ICONS.redCross} alt='' width={12} height={12} />
        </button>
      </label>

      <input
        type='file'
        className={s.input}
        onChange={handleFileFieldChange}
        name={name}
        ref={fileInputRef}
        id='file-field-input'
        disabled={Boolean(fileName)}
      />
    </div>
  );
}
