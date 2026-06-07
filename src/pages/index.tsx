import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const portfolioLinks = [
  {
    title: 'Career Profile',
    description: '금융, 보험, 마이데이터 도메인에서 쌓은 약 10년의 개발 이력',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Selected Projects',
    description: '사이드 프로젝트와 제품 아이디어를 기획부터 기술 관점까지 정리',
    href: '/docs/project',
  },
  {
    title: 'Dev Story',
    description: '실무에서 마주친 문제와 해결 과정을 회고형 글로 기록',
    href: '/blog/dev-story',
  },
];

const strengths = [
  'Spring Boot + Batch',
  'React + TypeScript',
  'Oracle + PostgreSQL',
  'GitHub + Netlify',
];

const heroStats = [
  {value: '10y+', label: '금융, 보험, 마이데이터'},
  {value: 'Full-stack', label: '백엔드와 프론트엔드 연결'},
  {value: 'Product-minded', label: '반복 업무를 도구로 전환'},
];

const signalRows = [
  {label: 'Domain', value: 'Finance / Insurance / MyData'},
  {label: 'Build', value: 'Spring Boot / React / Batch'},
  {label: 'Current', value: '증권 상품 업무와 개인 제품 실험'},
];

const principles = [
  {
    title: '운영 맥락',
    description: '장애, 배치, 인증, 대외 연계처럼 운영에서 드러나는 병목을 먼저 읽습니다.',
  },
  {
    title: '제품화',
    description: '반복되는 수작업을 검토 가능한 화면과 워크플로우로 옮깁니다.',
  },
  {
    title: '공개 범위',
    description: '진행 중인 private 프로젝트는 아이디어를 보호하면서 문제 정의와 설계 판단만 공개합니다.',
  },
];

const featuredWork = [
  {
    title: 'Shorts Source Radar',
    meta: '콘텐츠 리서치 자동화',
    href: '/docs/project/shorts-source-radar',
  },
  {
    title: 'Reread Bookshelf',
    meta: 'Local-first 개인 도구',
    href: '/docs/project/reread-bookshelf',
  },
  {
    title: 'Shorts Pipeline',
    meta: 'AI 영상 제작 워크플로우',
    href: '/docs/project/shorts-pipeline',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Portfolio"
      description="박은도의 개발자 포트폴리오입니다. 금융, 보험, 마이데이터 프로젝트와 제품형 개인 프로젝트를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>eundo.today portfolio</p>
            <h1>박은도</h1>
            <p className={styles.heroCopy}>
              운영을 이해하고 제품으로 정리하는 풀스택 개발자입니다. 금융, 보험,
              마이데이터 시스템에서 쌓은 실무 경험을 바탕으로 안정적인 업무 흐름과
              사용자 경험을 함께 설계합니다.
            </p>
            <div className={styles.heroStats} aria-label="Portfolio summary">
              {heroStats.map((item) => (
                <div key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <a className="button button--primary button--lg" href="/docs/aboutMe/PARK%20EUNDO">
                경력 보기
              </a>
              <a className="button button--secondary button--lg" href="/docs/project">
                프로젝트 보기
              </a>
            </div>
          </div>

          <aside className={styles.signalBoard} aria-label="Portfolio focus">
            <div className={styles.brandLockup}>
              <img src="/img/brand-mark.svg" alt="" />
              <div>
                <span>eundo.today</span>
                <strong>Developer Portfolio</strong>
              </div>
            </div>
            <dl className={styles.signalList}>
              {signalRows.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.signalBars} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>
        </section>

        <section className={styles.strengthBand} aria-label="Core strengths">
          <strong>Core Stack</strong>
          {strengths.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className={styles.portfolioGrid}>
          {portfolioLinks.map((item) => (
            <a key={item.title} className={styles.portfolioCard} href={item.href}>
              <span>{item.title}</span>
              <p>{item.description}</p>
            </a>
          ))}
        </section>

        <section className={styles.operatingSection}>
          <div>
            <p className={styles.sectionLabel}>Working Principles</p>
            <h2>실무 시스템과 개인 제품을 같은 기준으로 다룹니다</h2>
          </div>
          <div className={styles.principleGrid}>
            {principles.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.recentWork}>
          <div>
            <p className={styles.sectionLabel}>Featured Work</p>
            <h2>반복 작업을 제품형 도구로 정리하는 프로젝트</h2>
          </div>
          <div className={styles.workList}>
            {featuredWork.map((item) => (
              <a key={item.title} href={item.href}>
                <span>{item.meta}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
