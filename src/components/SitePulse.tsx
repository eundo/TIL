import React, {useEffect, useMemo, useState} from 'react';

import styles from './SitePulse.module.css';

type SiteStats = {
  todayVisits: number;
  totalVisits: number;
};

type SitePulseProps = {
  className?: string;
  compact?: boolean;
};

function formatCount(value: number | null): string {
  if (value === null) {
    return '--';
  }

  return new Intl.NumberFormat('ko-KR').format(value);
}

export default function SitePulse({className, compact = false}: SitePulseProps): JSX.Element {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [hasError, setHasError] = useState(false);
  const classNames = useMemo(
    () =>
      [styles.sitePulse, compact ? styles.compact : '', className ?? '']
        .filter(Boolean)
        .join(' '),
    [className, compact],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch('/api/site-stats');

        if (!response.ok) {
          throw new Error(`Site stats failed with ${response.status}`);
        }

        const nextStats = (await response.json()) as SiteStats;

        if (!isMounted) {
          return;
        }

        setStats(nextStats);
        setHasError(false);
      } catch {
        if (!isMounted) {
          return;
        }

        setHasError(true);
      }
    }

    function handleStatsUpdated(event: Event) {
      const detail = (event as CustomEvent<SiteStats>).detail;

      if (detail?.totalVisits !== undefined && detail?.todayVisits !== undefined) {
        setStats(detail);
        setHasError(false);
      }
    }

    window.addEventListener('site-stats-updated', handleStatsUpdated);
    loadStats();

    return () => {
      isMounted = false;
      window.removeEventListener('site-stats-updated', handleStatsUpdated);
    };
  }, []);

  return (
    <aside className={classNames} aria-label="Site pulse">
      <div className={`${styles.pulseCell} ${hasError ? styles.pulseError : ''}`}>
        <span>Total</span>
        <strong>{hasError ? 'Offline' : formatCount(stats?.totalVisits ?? null)}</strong>
      </div>
      <div className={`${styles.pulseCell} ${hasError ? styles.pulseError : ''}`}>
        <span>Today</span>
        <strong>{hasError ? '--' : formatCount(stats?.todayVisits ?? null)}</strong>
      </div>
      <a className={styles.guestbookLink} href="/guestbook">
        <span>Guestbook</span>
        <strong>남기기</strong>
      </a>
    </aside>
  );
}
