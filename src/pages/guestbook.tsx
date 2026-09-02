import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';

import SitePulse from '../components/SitePulse';
import styles from './guestbook.module.css';

type GuestbookEntry = {
  createdAt: string;
  id: string;
  message: string;
  name: string;
};

type GuestbookResponse = {
  count: number;
  entries: GuestbookEntry[];
  message?: string;
};

const MESSAGE_LIMIT = 240;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Seoul',
    year: 'numeric',
  }).format(new Date(value));
}

export default function Guestbook(): JSX.Element {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [entryCount, setEntryCount] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = useMemo(
    () => name.trim().length > 0 && message.trim().length > 1 && !isSubmitting,
    [isSubmitting, message, name],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadEntries() {
      try {
        const response = await fetch('/api/guestbook');

        if (!response.ok) {
          throw new Error(`Guestbook failed with ${response.status}`);
        }

        const data = (await response.json()) as GuestbookResponse;

        if (!isMounted) {
          return;
        }

        setEntries(data.entries ?? []);
        setEntryCount(data.count ?? 0);
      } catch {
        if (isMounted) {
          setStatus('방명록을 불러오지 못했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/guestbook', {
        body: JSON.stringify({message, name, website}),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      });
      const data = (await response.json()) as GuestbookResponse;

      if (!response.ok) {
        throw new Error(data.message ?? '저장하지 못했습니다.');
      }

      setEntries(data.entries ?? []);
      setEntryCount(data.count ?? 0);
      setName('');
      setMessage('');
      setWebsite('');
      setStatus('남겼습니다.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '저장하지 못했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout
      title="Guestbook | eundo.today"
      description="eundo.today 방문자가 짧은 메시지를 남길 수 있는 방명록입니다.">
      <main className={styles.guestbookPage}>
        <section className={styles.hero}>
          <div>
            <h1>Guestbook</h1>
            <p>이름과 짧은 메시지만 남길 수 있습니다. 링크는 받지 않습니다.</p>
          </div>
          <SitePulse className={styles.heroPulse} compact />
        </section>

        <section className={styles.content}>
          <form className={styles.guestbookForm} onSubmit={handleSubmit}>
            <label>
              이름
              <input
                autoComplete="name"
                maxLength={24}
                onChange={(event) => setName(event.target.value)}
                placeholder="이름"
                type="text"
                value={name}
              />
            </label>
            <label>
              메시지
              <textarea
                maxLength={MESSAGE_LIMIT}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="짧게 남겨주세요"
                value={message}
              />
            </label>
            <label className={styles.hiddenField} aria-hidden="true">
              Website
              <input
                autoComplete="off"
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                type="text"
                value={website}
              />
            </label>
            <div className={styles.formMeta}>
              <span>{status || '링크와 HTML은 저장하지 않습니다.'}</span>
              <strong>
                {message.length} / {MESSAGE_LIMIT}
              </strong>
            </div>
            <button className={styles.submitButton} disabled={!canSubmit} type="submit">
              {isSubmitting ? '저장 중' : '남기기'}
            </button>
          </form>

          <div className={styles.entryList}>
            <header className={styles.entryHeader}>
              <h2>Messages</h2>
              <span>{isLoading ? 'Loading' : `${entryCount} entries`}</span>
            </header>
            {!isLoading && entries.length === 0 ? (
              <div className={styles.emptyState}>
                <strong>아직 남겨진 메시지가 없습니다.</strong>
                <p>편하게 한 줄 남겨주세요.</p>
              </div>
            ) : (
              entries.map((entry) => (
                <article className={styles.entry} key={entry.id}>
                  <div className={styles.entryTop}>
                    <strong>{entry.name}</strong>
                    <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
                  </div>
                  <p>{entry.message}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
