import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const portfolioLinks = [
  {
    title: 'About',
    description: '경력과 맡았던 일',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Dev Stories',
    description: '실무에서 고친 문제',
    href: '/blog/dev-story',
  },
  {
    title: 'Projects',
    description: '혼자 만든 도구들',
    href: '/docs/project',
  },
];

const strengths = [
  'Java/Spring',
  'Batch/대용량 처리',
  'React 업무 화면',
  'Oracle/PostgreSQL',
];

const heroStats = [
  {value: '10y+', label: '금융권 운영 개발'},
  {value: 'Batch/API', label: '로그 적재 · 비동기 호출'},
  {value: 'Product', label: '개인 자동화 실험'},
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

const featuredProject = {
  title: 'Shorts Pipeline',
  description: '영상 업로드부터 TTS, 자막, FFmpeg 합성까지 한 화면 흐름으로 묶어 본 작업입니다.',
  href: '/docs/project/shorts-pipeline',
  desktopImage: '/img/projects/shorts-pipeline-live-editor.png',
  mobileImage: '/img/projects/shorts-pipeline-live-mobile-editor.png',
  tags: ['FastAPI', 'LLM API', 'FFmpeg', 'Docker'],
};

const principles = [
  {
    title: '운영 개발',
    description: '정해진 업무 안에서도 손으로 반복하는 일은 줄일 방법을 찾습니다.',
  },
  {
    title: '화면과 배치',
    description: '백엔드 처리와 사용자가 보는 화면을 같이 맞춥니다.',
  },
  {
    title: '개인 제품',
    description: '궁금한 아이디어는 작게라도 화면으로 만들어 확인합니다.',
  },
];

const workSignals = [
  {
    metric: 'About',
    title: '경력 요약',
    description: '회사명보다 맡은 일과 남은 결과가 먼저 보이게 정리했습니다.',
  },
  {
    metric: 'Stories',
    title: '실무 기록',
    description: '배치, 비동기 API, SPA 전환처럼 직접 만진 문제만 적었습니다.',
  },
  {
    metric: 'Projects',
    title: '개인 프로젝트',
    description: '코드는 닫고, 화면과 흐름은 열어 둡니다.',
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
      title="박은도 Portfolio"
      description="박은도의 개발자 포트폴리오입니다. 실무 경력, 개발 기록, 개인 프로젝트를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              <span>Backend · Batch · Frontend</span>
              박은도
            </h1>
            <p className={styles.heroCopy}>
              금융권 운영 개발을 해왔습니다. 배치로 줄이고, 화면으로 묶고, 개인 프로젝트로 다시 만들어 봅니다.
            </p>
            <div className={styles.sparkList} aria-label="Core stack">
              {['Web', 'Backend', 'Batch', 'API', 'Automation'].map((item) => (
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
                프로젝트 보기
              </a>
              <a className="button button--secondary button--lg" href="/docs/aboutMe/PARK%20EUNDO">
                경력 보기
              </a>
            </div>
          </div>

          <aside className={styles.showcasePanel} aria-label="Selected project preview">
            <div className={styles.showcaseCopy}>
              <span>Selected Work</span>
              <strong>{featuredProject.title}</strong>
              <p>{featuredProject.description}</p>
              <div className={styles.showcaseTags}>
                {featuredProject.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
              <a href={featuredProject.href}>프로젝트 상세 보기</a>
            </div>
            <div className={styles.showcaseVisual} aria-hidden="true">
              <img
                className={styles.desktopShot}
                src={featuredProject.desktopImage}
                alt=""
              />
              <img
                className={styles.mobileShot}
                src={featuredProject.mobileImage}
                alt=""
              />
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
            <h2>먼저 볼 것만 앞에 뒀습니다</h2>
            <p>
              경력은 About, 실무 기록은 Dev Stories, 직접 만든 도구는 Projects에 나눠 뒀습니다.
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
            <h2>실무에서 한 일, 혼자 만든 것</h2>
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
            <h2>직접 겪고 고친 것</h2>
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
            <h2>혼자 만들며 테스트한 것</h2>
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
