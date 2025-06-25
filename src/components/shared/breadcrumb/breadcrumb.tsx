'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './breadcrumb.scss';

// ^======================== Breadcrumb ========================^ //

type BreadcrumbProps = {
  title: string;
  href: string;
};

function Breadcrumb(breadcrumbProps: BreadcrumbProps): React.JSX.Element {

  const { title, href } = breadcrumbProps;
  const pathname = usePathname();

  const pathnames = pathname.split('/').slice(0, -1);

  return (
    <Link
      className={clsx(
        'breadcrumb',
        { '_active': `/${pathnames[pathnames.length - 1]}/` === href }
      )}
      href={href}
    >
      {title}
    </Link>
  );
}
export default Breadcrumb;