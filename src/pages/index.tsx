import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type ProjectSample = {
  title: string;
  label: string;
  summary: string;
  href: string;
  accent: string;
  desktopImage: string;
  mobileImage: string;
  mobileOnly?: boolean;
  stack: string[];
  signals: string[];
};

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
  'WordPress REST',
];

const heroStats = [
  {value: '10y+', label: '금융권 운영 개발'},
  {value: 'Batch/API', label: '적재, 호출, 재처리'},
  {value: 'Products', label: '개인 자동화 도구'},
];

const projectSamples: ProjectSample[] = [
  {
    title: 'Shorts Pipeline',
    label: 'Featured',
    summary: '수집, 편집, TTS, 자막, 피사체 추적, FFmpeg 합성을 한 콘솔에서 다루는 숏폼 제작 파이프라인.',
    href: '/docs/project/shorts-pipeline',
    accent: '#6c4dff',
    desktopImage: '/img/projects/shorts-pipeline-sample-captions-desktop.png',
    mobileImage: '/img/projects/shorts-pipeline-sample-export-mobile.png',
    stack: ['FastAPI', 'LLM API', 'FFmpeg', 'Docker'],
    signals: ['6 clips', '8 caption lines', '9:16 export'],
  },
  {
    title: 'Source Radar',
    label: 'Research Queue',
    summary: 'YouTube 후보가 쌓이기 전에 제목 훅, 채널명 오탐, 설명문-only 신호를 걸러내는 리서치 queue.',
    href: '/docs/project/shorts-source-radar',
    accent: '#ff5a7a',
    desktopImage: '/img/projects/shorts-source-radar-empty-mobile.png',
    mobileImage: '/img/projects/shorts-source-radar-empty-mobile.png',
    mobileOnly: true,
    stack: ['Node.js', 'Netlify Functions', 'Notion API'],
    signals: ['quality gate', 'skip learning', 'mobile first'],
  },
  {
    title: 'Content Studio',
    label: 'Publishing Console',
    summary: '주제 추천, 글 생성, 이미지 패키지, SEO 검수, WordPress draft 저장을 묶은 콘텐츠 운영 콘솔.',
    href: '/docs/project/eundo-content-studio',
    accent: '#00d6b3',
    desktopImage: '/img/projects/eundo-content-studio-dashboard-desktop.png',
    mobileImage: '/img/projects/eundo-content-studio-dashboard-mobile.png',
    stack: ['React', 'Express', 'Python', 'WordPress REST'],
    signals: ['10 topics', '3 picked', 'WP draft'],
  },
  {
    title: 'Reread Bookshelf',
    label: 'Local-first',
    summary: 'RIDI, 시리즈, 카카오페이지 기록을 기억 단서와 스크린샷 OCR 중심으로 저장하는 개인 책장.',
    href: '/docs/project/reread-bookshelf',
    accent: '#ffe85c',
    desktopImage: '/img/projects/reread-bookshelf-sample-detail-mobile.png',
    mobileImage: '/img/projects/reread-bookshelf-sample-detail-mobile.png',
    mobileOnly: true,
    stack: ['JavaScript', 'PWA', 'localStorage', 'OCR'],
    signals: ['8 records', 'OCR input', 'mobile sheet'],
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

const routeCards = [
  {
    title: 'About',
    description: '경력, 역할, 맡았던 시스템',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Stories',
    description: '배치, API, React 실무 기록',
    href: '/blog/dev-story',
  },
  {
    title: 'Projects',
    description: '직접 만든 개인 도구',
    href: '/docs/project',
  },
];

const capabilityRows = [
  ['Backend', 'Spring 기반 운영 API, 인증, 대외 연계'],
  ['Batch', '대용량 처리, 재시도, 상태 추적'],
  ['Product UI', 'React 업무 화면과 개인 프로젝트 UI'],
  ['Automation', '반복 작업을 줄이는 작은 도구 설계'],
];

function ProjectVisual({project}: {project: ProjectSample}) {
  return (
    <div className={`${styles.projectVisual} ${project.mobileOnly ? styles.mobileOnlyVisual : ''}`}>
      {!project.mobileOnly && (
        <img
          className={styles.desktopShot}
          src={project.desktopImage}
          alt={`${project.title} desktop screen`}
        />
      )}
      <img
        className={project.mobileOnly ? styles.mobileOnlyShot : styles.mobileShot}
        src={project.mobileImage}
        alt={`${project.title} mobile screen`}
      />
    </div>
  );
}

function ProjectCard({project, index}: {project: ProjectSample; index: number}) {
  return (
    <a
      className={styles.projectCard}
      href={project.href}
      style={{'--project-accent': project.accent} as React.CSSProperties}
    >
      <div className={styles.projectCardTop}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <em>{project.label}</em>
      </div>
      <ProjectVisual project={project} />
      <div className={styles.projectCardBody}>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className={styles.signalList}>
          {project.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <div className={styles.stackList}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Home(): JSX.Element {
  const featured = projectSamples[0];

  return (
    <Layout
      title="박은도 | Backend / Batch / Product UI"
      description="박은도의 개발자 포트폴리오입니다. 금융권 운영 개발, 배치와 API, 개인 프로젝트를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              <span>박은도</span>
              Backend / Batch / Product UI
            </h1>
            <p>
              금융권 운영 개발을 해왔고, 개인 프로젝트는 직접 쓰려고 만듭니다.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#selected-work">Projects</a>
              <a className={styles.secondaryAction} href="/docs/aboutMe/PARK%20EUNDO">About</a>
            </div>
            <div className={styles.heroStats} aria-label="Portfolio summary">
              {heroStats.map((item) => (
                <div key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            className={styles.heroShowcase}
            href={featured.href}
            style={{'--project-accent': featured.accent} as React.CSSProperties}
            aria-label="Shorts Pipeline project detail"
          >
            <div className={styles.showcaseHeader}>
              <strong>{featured.title}</strong>
              <span>Featured Project</span>
            </div>
            <ProjectVisual project={featured} />
            <div className={styles.showcaseFooter}>
              <span>{featured.stack.join(' / ')}</span>
              <b>View</b>
            </div>
          </a>
        </section>

        <section className={styles.stackTicker} aria-label="Technology stack">
          <div>
            {[...stackTicker, ...stackTicker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="selected-work" className={styles.selectedWork}>
          <div className={styles.sectionHead}>
            <h2>Selected Work</h2>
            <p>Private repo는 닫아두고, 실제 화면과 구현 단위만 공개합니다.</p>
          </div>
          <div className={styles.projectGrid}>
            {projectSamples.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className={styles.routeSection}>
          <div className={styles.routeIntro}>
            <h2>Career / Stories / Products</h2>
            <p>경력, 실무 회고, 개인 도구를 따로 볼 수 있게 나눴습니다.</p>
          </div>
          <div className={styles.routeGrid}>
            {routeCards.map((item) => (
              <a key={item.title} href={item.href}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.capabilitySection}>
          <h2>Core Stack</h2>
          <div className={styles.capabilityGrid}>
            {capabilityRows.map(([title, description]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHead}>
            <h2>Stories</h2>
            <p>배치, API, SPA 전환처럼 실제로 손댔던 것만 남겼습니다.</p>
          </div>
          <div className={styles.storyList}>
            {caseStudies.map((item) => (
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
