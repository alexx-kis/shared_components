'use client';

import { AppRoute, PagesNames } from '@/constants/const';
import { usePathname } from 'next/navigation';
import Breadcrumb from '../breadcrumb/breadcrumb';
import './breadcrumbs.scss';

// $======================== Breadcrumbs ========================$ //

type BreadcrumbsProps = {
  bemClass: string;
};

function Breadcrumbs(breadcrumbsProps: BreadcrumbsProps): React.JSX.Element {

  const { bemClass } = breadcrumbsProps;
  const pathname = usePathname();
  const rawPathnames = pathname.split('/').slice(1); // remove first empty segment

  // Remove trailing empty string
  const cleanedPathnames =
    rawPathnames[rawPathnames.length - 1] === ''
      ? rawPathnames.slice(0, -1)
      : rawPathnames;

  // Remove article slug if on a blog article page
  const pathnamesWithoutLast =
    cleanedPathnames[0] === 'blog' && cleanedPathnames.length > 1
      ? cleanedPathnames.slice(0, -1)
      : cleanedPathnames;

  return (
    <ul className={`${bemClass} breadcrumbs`}>
      <li className='breadcrumbs__item'>
        <Breadcrumb
          title={PagesNames[AppRoute.HOME]}
          href={AppRoute.HOME}
        />
      </li>
      {pathnamesWithoutLast.map((href) => (
        <li key={href} className='breadcrumbs__item'>
          <Breadcrumb
            title={PagesNames[`/${href}/` as keyof typeof PagesNames]}
            href={`/${href}/`}
          />
        </li>
      ))}

    </ul>
  );
}
export default Breadcrumbs;