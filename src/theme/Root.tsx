import React, {useEffect} from 'react';

import type {ReactNode} from 'react';

const VISIT_KEY_PREFIX = 'eundo.today.visit-counted';

function todayKey(): string {
  return new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Seoul',
    year: 'numeric',
  }).format(new Date());
}

export default function Root({children}: {children: ReactNode}): JSX.Element {
  useEffect(() => {
    let isMounted = true;

    async function countVisit() {
      const storageKey = `${VISIT_KEY_PREFIX}.${todayKey()}`;
      let alreadyCounted = false;

      try {
        alreadyCounted = window.localStorage.getItem(storageKey) === '1';
      } catch {
        alreadyCounted = false;
      }

      if (alreadyCounted) {
        return;
      }

      try {
        const response = await fetch('/api/site-stats', {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
        });

        if (!response.ok) {
          return;
        }

        const stats = await response.json();

        try {
          window.localStorage.setItem(storageKey, '1');
        } catch {
          // Private browsing or strict storage settings can reject writes.
        }

        if (isMounted) {
          window.dispatchEvent(new CustomEvent('site-stats-updated', {detail: stats}));
        }
      } catch {
        // Static preview builds do not serve Netlify Functions.
      }
    }

    countVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{children}</>;
}
