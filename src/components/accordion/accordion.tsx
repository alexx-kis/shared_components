'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import s from './accordion.module.scss'

// $======================== Accordion ========================$ //

export type AccordionDataType<H, B> = {
  header: H;
  body: B;
};

type AccordionProps<H, B> = {
  className: string;
  data: AccordionDataType<H, B>[];
  HeaderComponent: React.JSXElementConstructor<H>;
  BodyComponent: React.JSXElementConstructor<B>;
  isFirstTabOpen: boolean;
};

function Accordion<H extends object, B extends object>(accordionProps: AccordionProps<H, B>): React.JSX.Element {
  const { className, data, HeaderComponent, BodyComponent, isFirstTabOpen } = accordionProps;

  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(isFirstTabOpen ? 0 : null);
  const [scrollHeight, setScrollHeight] = useState<number | undefined>(0);

  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (bodyRefs.current[activeTabIndex!]) {
      setScrollHeight(bodyRefs.current[activeTabIndex!]?.scrollHeight || 0);
    }
  }, [activeTabIndex]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul className={clsx(className, s.accordion)}>
      {data.map(({ header, body }, index) => (
        <li key={index} className={clsx(s.tab, { [s._active]: activeTabIndex === index })}>
          <div className={s.header} onClick={() => handleTabClick(index)}>
            <HeaderComponent {...header} isActive={activeTabIndex === index} />
          </div>
          <div
            className={s.body}
            ref={(el) => { if (el) bodyRefs.current[index] = el; }}
            style={{ maxHeight: activeTabIndex === index ? `${scrollHeight! + 1}px` : '0' }}
          >
            <BodyComponent {...body} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Accordion;


// accordion usage:
{/* 
<Accordion bemClass='vacancies-section__accordion'
  data={accordionData}
  HeaderComponent={VacancyHeader}
  BodyComponent={VacancyBody}
  isFirstTabOpen={false}
/> 
*/}