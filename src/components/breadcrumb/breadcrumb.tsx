'use client';

import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import s from './breadcrumb.module.scss';

// ^======================== Breadcrumb ========================^ //

type BreadcrumbProps = {
  title: string;
  href: string;
};

export default function Breadcrumb(breadcrumbProps: BreadcrumbProps): React.JSX.Element {

  const { title, href } = breadcrumbProps;
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').slice(0, -1);

  return (
    <Link
      className={clsx(
        s.breadcrumb,
        { [s._active]: `/${pathnames[pathnames.length - 1]}/` === href }
      )}
      to={href}
    >
      {title}
    </Link>
  );
}