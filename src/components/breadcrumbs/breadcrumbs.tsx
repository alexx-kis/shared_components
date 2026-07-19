'use client';

import { AppRoute, PagesNames } from '@/constants/const';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../breadcrumb/breadcrumb';
import s from './breadcrumbs.module.scss';
import clsx from 'clsx';

// $======================== Breadcrumbs ========================$ //

type BreadcrumbsProps = {
  className: string;
};

export default function Breadcrumbs(breadcrumbsProps: BreadcrumbsProps): React.JSX.Element {

  const { className } = breadcrumbsProps;
  const { pathname } = useLocation();
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
    <ul className={clsx(className, s.breadcrumbs)}>
      <li className={s.item}>
        <Breadcrumb
          title={PagesNames[AppRoute.HOME]}
          href={AppRoute.HOME}
        />
      </li>
      {pathnamesWithoutLast.map((href: string) => (
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