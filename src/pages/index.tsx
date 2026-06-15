import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const portfolioLinks = [
  {
    title: 'Career Profile',
    description: '금융, 보험, 마이데이터 운영 고도화 경험과 실무 투입 포인트',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Case Studies',
    description: '배치, 비동기 처리, SPA 전환처럼 현업 문제를 해결한 사례',
    href: '/blog/dev-story',
  },
  {
    title: 'Product Experiments',
    description: '반복 작업을 도구화하는 개인 프로젝트와 제품화 실험',
    href: '/docs/project',
  },
];

const strengths = [
  'Java/Spring 운영 고도화',
  'Batch/대용량 처리',
  'React 업무 화면 개선',
  'Oracle/PostgreSQL 데이터 처리',
];

const heroStats = [
  {value: '10y+', label: '금융, 보험, 마이데이터'},
  {value: 'Operation', label: '배치, 인증, 연계, 장애 대응'},
  {value: 'Full-stack', label: 'Spring Boot와 React 연결'},
];

const signalRows = [
  {label: 'Domain', value: 'Finance / Insurance / MyData'},
  {label: 'Scope', value: '운영 개선 / 업무 화면 / 데이터 처리'},
  {label: 'Current', value: '증권 상품 업무 설계 및 개발'},
];

const flowSteps = [
  {label: 'Diagnose', value: '운영 병목'},
  {label: 'Design', value: '처리 흐름'},
  {label: 'Stabilize', value: '배포와 운영'},
];

const stackTicker = [
  'Spring Boot',
  'Batch',
  'React',
  'TypeScript',
  'Oracle',
  'PostgreSQL',
  'Netlify',
  'GitHub Actions',
  'LLM Workflow',
];

const principles = [
  {
    title: '운영 안정성',
    description: '장애, 배치, 인증, 대외 연계처럼 운영에서 드러나는 병목과 리스크를 먼저 봅니다.',
  },
  {
    title: '업무 흐름 개선',
    description: '수작업으로 처리하던 예외와 반복 업무를 화면, 상태, 재처리 흐름으로 옮깁니다.',
  },
  {
    title: '레거시와 현대화',
    description: 'Pro-C, JSP 같은 레거시 환경과 Spring Boot, React 기반 고도화 작업을 함께 다룹니다.',
  },
];

const caseStudies = [
  {
    title: '실시간 로그적재 배치 개발',
    meta: 'Spring Batch / 멀티스레드 / 로그 적재',
    href: '/blog/dev-story/실시간%20로그적재%20배치개발',
  },
  {
    title: 'API 비동기 호출 데이터 처리',
    meta: '비동기 호출 / 상태 확인 / 재시도',
    href: '/blog/dev-story/API%20비동기호출%20데이터처리%20개발',
  },
  {
    title: 'React 기반 웹앱 SPA 전환',
    meta: 'React / Redux / 상태 유지',
    href: '/docs/aboutMe/PARK%20EUNDO#react-기반-웹앱-spa-전환',
  },
  {
    title: '보험금 재이체 처리 시스템',
    meta: '운영 자동화 / 오류 재처리 / 업무 화면',
    href: '/docs/aboutMe/PARK%20EUNDO#보험금-지급-오류-재이체-처리-시스템',
  },
];

const productExperiments = [
  {
    title: 'Shorts Pipeline',
    meta: 'AI 영상 제작 워크플로우',
    href: '/docs/project/shorts-pipeline',
  },
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
];

export default function Home(): JSX.Element {
  return (
      <Layout
      title="Operational Full-stack Portfolio"
      description="박은도의 개발자 포트폴리오입니다. 금융, 보험, 마이데이터 운영 고도화 경험과 실무 문제 해결 사례를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>eundo.today portfolio</p>
            <h1>박은도</h1>
            <p className={styles.heroCopy}>
              금융, 보험, 마이데이터 운영 시스템을 고도화해 온 풀스택 개발자입니다.
              Java/Spring 기반 배치, 인증, 데이터 처리와 React 업무 화면 개선을 함께 다룹니다.
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
              <a className="button button--secondary button--lg" href="/blog/dev-story">
                실무 사례 보기
              </a>
            </div>
          </div>

          <aside className={styles.signalBoard} aria-label="Portfolio focus">
            <div className={styles.boardHeader}>
              <img src="/img/brand-mark.svg" alt="" />
              <div>
                <span>eundo.today</span>
                <strong>Developer Portfolio</strong>
              </div>
              <em>Live</em>
            </div>
            <div className={styles.pipelineMap} aria-label="Working flow">
              {flowSteps.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
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

        <section className={styles.stackTicker} aria-label="Technology stack">
          <div>
            {[...stackTicker, ...stackTicker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
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
            <h2>운영에서 드러나는 문제를 안정적인 업무 흐름으로 바꿉니다</h2>
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
            <p className={styles.sectionLabel}>Case Studies</p>
            <h2>현업 문제를 어떻게 분석하고 구현했는지 보여주는 사례</h2>
          </div>
          <div className={styles.workList}>
            {caseStudies.map((item) => (
              <a key={item.title} href={item.href}>
                <span>{item.meta}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.recentWork} ${styles.productLab}`}>
          <div>
            <p className={styles.sectionLabel}>Product Experiments</p>
            <h2>반복 작업을 도구화하는 개인 프로젝트</h2>
          </div>
          <div className={styles.workList}>
            {productExperiments.map((item) => (
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
