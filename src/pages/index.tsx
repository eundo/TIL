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
  {value: 'Ops', label: '장애와 반복 작업을 처리 흐름으로'},
  {value: 'UI', label: '끊기는 업무 화면을 상태가 있는 화면으로'},
  {value: 'Lab', label: '아이디어를 개인 도구로 빠르게 실험'},
];

const fractureCards = [
  {mark: '01', crack: '1분마다 쌓이는 로그', move: '중복 없이 적재되는 배치'},
  {mark: '02', crack: '빈 응답과 재시도', move: '상태를 가진 비동기 처리'},
  {mark: '03', crack: '끊기는 팝업 화면', move: '흐름이 유지되는 SPA'},
  {mark: '04', crack: '수작업 재처리', move: '운영자가 누를 수 있는 화면'},
];

const labNodes = [
  {label: 'log', value: '파일'},
  {label: 'api', value: '상태'},
  {label: 'screen', value: '흐름'},
  {label: 'tool', value: '도구'},
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

const workSignals = [
  {
    metric: 'Trace',
    title: '문제의 흔적을 먼저 봅니다',
    description: '로그, 상태, 예외, 수작업처럼 시스템이 삐걱거리는 지점을 작게 쪼개서 확인합니다.',
  },
  {
    metric: 'Flow',
    title: '흐름으로 다시 설계합니다',
    description: '배치, 비동기 API, React SPA, 운영 재처리처럼 반복 가능한 처리 구조로 바꿉니다.',
  },
  {
    metric: 'Build',
    title: '작게 만들고 계속 다듬습니다',
    description: '개인 프로젝트에서도 아이디어를 실제 화면과 워크플로우로 옮기며 제품처럼 실험합니다.',
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
            <h1>
              <span>박은도</span>
              문제를 보면
              <br />
              흐름을 만듭니다
            </h1>
            <p className={styles.heroCopy}>
              운영 중인 시스템에서 1분마다 쌓이는 로그, 빈 API 응답, 끊기는 팝업 상태,
              수작업 재처리를 그냥 버그 목록으로 보지 않습니다. 반복 가능한 흐름, 화면, 도구로 바꿔서 일이 굴러가게 만듭니다.
            </p>
            <div className={styles.sparkList} aria-label="Problem fragments">
              {fractureCards.slice(0, 3).map((item) => (
                <span key={item.mark}>{item.crack}</span>
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
                작업 방식 보기
              </a>
              <a className="button button--secondary button--lg" href="/blog/dev-story">
                실무 사례 보기
              </a>
            </div>
          </div>

          <aside className={styles.labCanvas} aria-label="Problem workbench">
            <div className={styles.labHeader}>
              <span>workbench</span>
              <strong>문제 조각을 실행 가능한 흐름으로</strong>
            </div>
            <div className={styles.labStage} aria-hidden="true">
              <div className={styles.labCore}>
                <span>FLOW</span>
              </div>
              {labNodes.map((item, index) => (
                <div key={item.label} className={`${styles.labNode} ${styles[`labNode${index + 1}`]}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.fractureList}>
              {fractureCards.map((item) => (
                <div key={item.mark}>
                  <span>{item.mark}</span>
                  <p>{item.crack}</p>
                  <strong>{item.move}</strong>
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
            <p className={styles.sectionLabel}>Workbench Notes</p>
            <h2>가볍게 포장한 이력서가 아니라, 문제를 다루는 방식의 기록입니다</h2>
            <p>
              업무 시스템에서 마주친 병목과 개인 프로젝트에서 만든 실험을 같은 기준으로 정리했습니다.
              문제를 어떻게 발견하고, 어떤 형태의 흐름으로 바꾸는지 이어서 볼 수 있습니다.
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
