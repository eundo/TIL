import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const portfolioLinks = [
  {
    title: 'About',
    description: '경력, 역할, 기술 스택',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Dev Stories',
    description: '배치, API, 화면 개선 회고',
    href: '/blog/dev-story',
  },
  {
    title: 'Projects',
    description: '개인 제품 실험과 화면 기록',
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
  {value: 'Backend', label: 'Spring Boot · Batch'},
  {value: 'Frontend', label: 'React · TypeScript'},
  {value: 'Product', label: 'AI workflow · Automation'},
];

const selectedCards = [
  {mark: '01', title: 'Shorts Pipeline', description: 'AI 영상 제작 워크플로우'},
  {mark: '02', title: 'Source Radar', description: '콘텐츠 리서치 자동화'},
  {mark: '03', title: 'Dev Stories', description: '운영 개발 회고'},
  {mark: '04', title: 'Career', description: '금융 도메인 실무 경험'},
];

const labNodes = [
  {label: 'Spring', value: 'Backend'},
  {label: 'React', value: 'Frontend'},
  {label: 'Batch', value: 'Ops'},
  {label: 'AI', value: 'Tools'},
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
    title: '운영 시스템',
    description: '장애, 배치, 인증, 대외 연계가 얽힌 환경에서 안정적으로 개발합니다.',
  },
  {
    title: '업무 화면',
    description: '반복 업무와 예외 처리를 화면, 상태, 재처리 기능으로 정리합니다.',
  },
  {
    title: '제품 실험',
    description: '개인 프로젝트에서 자동화 아이디어를 실제 화면과 서비스 형태로 만듭니다.',
  },
];

const workSignals = [
  {
    metric: 'About',
    title: '한눈에 보는 경력',
    description: '금융, 보험, 마이데이터, 증권 업무에서 맡았던 역할과 기술 스택을 정리했습니다.',
  },
  {
    metric: 'Stories',
    title: '실무 회고',
    description: '배치, 비동기 API, React SPA처럼 실제로 다뤘던 개발 경험을 짧게 풀었습니다.',
  },
  {
    metric: 'Projects',
    title: '개인 제품 실험',
    description: 'private 저장소의 핵심 화면과 동작을 포트폴리오용으로 선별해 소개합니다.',
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
      description="박은도의 개발자 포트폴리오입니다. 금융 도메인 개발 경험과 개인 프로젝트를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              <span>Software Engineer</span>
              박은도
            </h1>
            <p className={styles.heroCopy}>
              금융 도메인의 운영 시스템을 만들고, 개인 프로젝트로 자동화 제품을 실험합니다.
            </p>
            <div className={styles.sparkList} aria-label="Core stack">
              {stackTicker.slice(0, 5).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className={styles.heroStats} aria-label="Portfolio summary">
              {heroStats.map((item) => (
                <div key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <a className="button button--primary button--lg" href="#work-map">
                Selected Work
              </a>
              <a className="button button--secondary button--lg" href="/docs/aboutMe/PARK%20EUNDO">
                About
              </a>
            </div>
          </div>

          <aside className={styles.labCanvas} aria-label="Portfolio preview">
            <div className={styles.labHeader}>
              <span>portfolio</span>
              <strong>Selected work</strong>
            </div>
            <div className={styles.labStage} aria-hidden="true">
              <div className={styles.labCore}>
                <span>EP</span>
              </div>
              {labNodes.map((item, index) => (
                <div key={item.label} className={`${styles.labNode} ${styles[`labNode${index + 1}`]}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.fractureList}>
              {selectedCards.map((item) => (
                <div key={item.mark}>
                  <span>{item.mark}</span>
                  <p>{item.title}</p>
                  <strong>{item.description}</strong>
                </div>
              ))}
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

        <section id="work-map" className={styles.workMap}>
          <div className={styles.scanIntro}>
            <p className={styles.sectionLabel}>Selected</p>
            <h2>필요한 것만 빠르게 볼 수 있게 정리했습니다</h2>
            <p>
              경력, 실무 회고, 개인 프로젝트를 분리했습니다. 길게 읽기 전에도 방향을 알 수 있게 구성했습니다.
            </p>
          </div>
          <div className={styles.scanCards}>
            {workSignals.map((item) => (
              <article key={item.title}>
                <span>{item.metric}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
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
            <p className={styles.sectionLabel}>Notes</p>
            <h2>운영 개발과 개인 제품 실험을 같이 기록합니다</h2>
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
            <h2>실무에서 직접 다룬 개발 회고</h2>
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
