'use client';

import { QuantityChangeType } from '@/constants/const';
import clsx from 'clsx';
import s from './quantity-box.module.scss';

// ^======================== QuantityBox ========================^ //

interface QuantityBoxProps {
  className: string;
  quantity: number;
  onQuantityBoxAction: (quantity: number) => void;
}

export default function QuantityBox(props: QuantityBoxProps): React.JSX.Element {
  const { className, quantity, onQuantityBoxAction } = props;

  const handleQuantityChange = (type: QuantityChangeType): void => {
    const nextQuantity = type === QuantityChangeType.INCREASE ? quantity + 1 : quantity - 1;

    if (nextQuantity < 1) return;

    onQuantityBoxAction(nextQuantity);
  };

  return (
    <div className={clsx(s['quantity-box'], className)}>
      <button
        className={clsx(s.button, s._minus, { [s._disabled]: quantity === 1 })}
        onClick={() => handleQuantityChange(QuantityChangeType.DECREASE)}
      />
      <span className={s.value}>{quantity}</span>
      <button
        className={clsx(s.button, s._plus)}
        onClick={() => handleQuantityChange(QuantityChangeType.INCREASE)}
      />
    </div>
  );
}
