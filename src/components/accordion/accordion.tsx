'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import s from './accordion.module.scss';

// $======================== Accordion ========================$ //

export type AccordionDataType<H, B> = {
  header: H;
  body: B;
};

type AccordionProps<H, B> = {
  className: string;
  tabClassName?: string;
  data: AccordionDataType<H, B>[];
  renderHeader: (header: H, isActive: boolean, index: number) => React.ReactNode;
  renderBody: (body: B, index: number) => React.ReactNode;
  isFirstTabOpen?: boolean;
};

export default function Accordion<H, B>(accordionProps: AccordionProps<H, B>): React.JSX.Element {
  const { className, tabClassName, data, renderHeader, renderBody, isFirstTabOpen } = accordionProps;

  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(isFirstTabOpen ? 0 : null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const bodyRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (activeTabIndex === null) return;

    const activeBody = bodyRefs.current[activeTabIndex];
    if (!activeBody) return;

    setScrollHeight(activeBody.scrollHeight);
  }, [activeTabIndex, data]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul className={clsx(className, s.accordion)}>
      {data.map(({ header, body }, index) => {
        const isActive = activeTabIndex === index;

        return (
          <li key={index} className={clsx(tabClassName, s.tab, { [s._active]: isActive })}>
            <div className={s.header} onClick={() => handleTabClick(index)}>
              {renderHeader(header, isActive, index)}
            </div>

            <div
              className={s.body}
              ref={(element) => {
                bodyRefs.current[index] = element;
              }}
              style={{ maxHeight: isActive ? `${scrollHeight + 1}px` : '0' }}
            >
              {renderBody(body, index)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
