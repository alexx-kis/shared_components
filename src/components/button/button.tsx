'use client'

import clsx from 'clsx';
import { MouseEvent, ReactNode } from 'react';
import './button.scss';
import Link from 'next/link';

// ^======================== Button ========================^ //

type CommonProps = {
  className?: string;
  active?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  } | CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    disabled?: never;
  };

function Button(buttonProps: ButtonProps) {

  const { className = '', active = false, children, href, onClick, ...props } = buttonProps;

  const commonProps = {
    className: clsx('button', className, { active }),
  };

  if (href) {
    const isInternalLink = href.startsWith('/');
    return isInternalLink ? (
      <Link href={href} {...commonProps} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    ) : (
      <a href={href} {...commonProps} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      onClick={(e) => {
        if (props.disabled) e.preventDefault();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
export default Button;