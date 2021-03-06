import React, { useCallback } from 'react';
import style from './index.module.scss';

interface IToc {
  level: number;
  text: string;
}

export const Toc: React.FC<{ tocs: Array<IToc>; maxHeight?: string | number }> = ({
  tocs = [],
}) => {
  const goto = useCallback((toc) => {
    try {
      const el = document.getElementById(toc.text.toLowerCase().split(' ').join('-'));
      if (el) {
        el.scrollIntoView();
      }
    } catch (e) {}
  }, []);

  return (
    <div className={style.wrapper}>
      <header>目录</header>
      <main>
        {tocs.map((toc) => {
          return (
            <div
              className={style.item}
              style={{ paddingLeft: 12 * (toc.level - 1), cursor: 'pointer' }}
              onClick={() => goto(toc)}
            >
              {toc.text}
            </div>
          );
        })}
      </main>
    </div>
  );
};