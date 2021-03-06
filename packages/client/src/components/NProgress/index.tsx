import * as NP from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function NProgress() {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const start = () => {
      timeout = setTimeout(NP.start, 100);
    };

    const done = () => {
      clearTimeout(timeout);
      NP.done();
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, []);

  return (
    <style jsx={true} global={true}>{`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: var(--primary-color, #ff0064);
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
    `}</style>
  );
}
