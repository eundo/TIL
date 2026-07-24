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
  description: '정밀 자막, 피사체 추적, FFmpeg 합성을 연결한 숏폼 제작 도구.',
  href: '/docs/project/shorts-pipeline',
  desktopImage: '/img/projects/shorts-pipeline-sample-captions-desktop.png',
  mobileImage: '/img/projects/shorts-pipeline-sample-export-mobile.png',
  tags: ['FastAPI', 'LLM API', 'FFmpeg', 'Docker'],
};

const principles = [
  {
    title: 'Backend',
    description: 'Spring 기반 운영 API, 인증, 대외 연계.',
  },
  {
    title: 'Batch',
    description: '대용량 처리, 재시도, 상태 추적.',
  },
  {
    title: 'Product UI',
    description: 'React 업무 화면과 개인 프로젝트 UI.',
  },
];

const workSignals = [
  {
    metric: 'About',
    title: 'Career',
    description: '금융, 보험, 증권 운영 개발 경력.',
  },
  {
    metric: 'Stories',
    title: 'Dev Stories',
    description: '배치, 비동기 API, React SPA 작업 기록.',
  },
  {
    metric: 'Projects',
    title: 'Projects',
    description: 'Shorts Pipeline과 개인 제품 실험.',
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

const projectSamples = [
  {
    title: 'Shorts Pipeline',
    label: 'Sample Job',
    headline: '레시피 영상 1개를 쇼츠 제작 상태로 관리',
    description:
      '업로드한 원본에서 클립을 고르고, TTS 대본과 정밀 자막, 피사체 추적, FFmpeg 합성까지 같은 콘솔에서 확인합니다.',
    desktopImage: '/img/projects/shorts-pipeline-sample-captions-desktop.png',
    mobileImage: '/img/projects/shorts-pipeline-sample-export-mobile.png',
    href: '/docs/project/shorts-pipeline',
    stats: [
      {value: '6 clips', label: '활성 클립'},
      {value: '8 lines', label: '정밀 자막'},
      {value: '9:16', label: '세로 합성'},
    ],
    sampleRows: [
      'TTS 대본: 담백한 설명형 42초 버전',
      '피사체 추적: 중앙 유지, 급격한 crop 이동 완화',
      '렌더링 상태: preview 완료, final compose 대기',
    ],
  },
  {
    title: 'Shorts Source Radar',
    label: 'Sample Queue',
    headline: 'YouTube 추천 후보를 검토 queue로 이동',
    description:
      '추천 화면에서 수집한 후보를 중복, 원본성, 채널 성격 기준으로 걸러내고 보관/제외/제작 예정 상태로 분류합니다.',
    desktopImage: '/img/projects/shorts-source-radar-sample-desktop.png',
    mobileImage: '/img/projects/shorts-source-radar-sample-mobile.png',
    href: '/docs/project/shorts-source-radar',
    stats: [
      {value: '8', label: '미검수'},
      {value: '5', label: '추천 수집'},
      {value: '2/1', label: '보관/제작'},
    ],
    sampleRows: [
      'Lane: 추천 수집함',
      'Quality gate: 재가공/하이라이트 후보 제외',
      'Export: 선택 후보만 Notion, Slack, CSV로 전송',
    ],
  },
  {
    title: 'Reread Bookshelf',
    label: 'Sample Shelf',
    headline: '제목보다 기억 단서로 다시 찾는 책장',
    description:
      'RIDI, 네이버 시리즈, 카카오페이지 기록을 작품 링크, 인물, 관계성, 분위기, 발췌 이미지 중심으로 저장합니다.',
    desktopImage: '/img/projects/reread-bookshelf-sample-desktop.png',
    mobileImage: '/img/projects/reread-bookshelf-sample-detail-mobile.png',
    href: '/docs/project/reread-bookshelf',
    stats: [
      {value: '8', label: '기록'},
      {value: '8', label: '재탕 후보'},
      {value: '0', label: '표지 없음'},
    ],
    sampleRows: [
      '기억 단서: 계약관계, 느린 감정선, 후반부 반전',
      '입력 흐름: 링크 자동 채우기 후 수동 보완',
      '모바일 UX: 시트 열림 상태를 back 버튼과 연결',
    ],
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
              금융권 운영 시스템, 배치, API, React 화면을 다룹니다. 반복되는 일은 작은 제품으로 만들어 검증합니다.
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

        <section className={styles.projectSampleDeck} aria-labelledby="project-samples-title">
          <div className={styles.sampleHeader}>
            <p className={styles.sectionLabel}>Project Samples</p>
            <h2 id="project-samples-title">실제 화면 샘플</h2>
            <p>
              개인 데이터는 빼고, 공개용 샘플 데이터로 앱 화면을 다시 채워 캡처했습니다.
            </p>
          </div>
          <div className={styles.sampleGrid}>
            {projectSamples.map((project) => (
              <article key={project.title} className={styles.sampleCard}>
                <div className={styles.sampleVisual}>
                  <img
                    className={styles.sampleDesktop}
                    src={project.desktopImage}
                    alt={`${project.title} 데스크톱 화면`}
                  />
                  <img
                    className={styles.sampleMobile}
                    src={project.mobileImage}
                    alt={`${project.title} 모바일 화면`}
                  />
                </div>
                <div className={styles.sampleBody}>
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <strong>{project.headline}</strong>
                  <p>{project.description}</p>
                  <div className={styles.sampleStats} aria-label={`${project.title} sample metrics`}>
                    {project.stats.map((stat) => (
                      <div key={`${project.title}-${stat.label}`}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <ul>
                    {project.sampleRows.map((row) => (
                      <li key={row}>{row}</li>
                    ))}
                  </ul>
                  <a href={project.href}>상세 화면 보기</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work-map" className={styles.workMap}>
          <div className={styles.scanIntro}>
            <p className={styles.sectionLabel}>Overview</p>
            <h2>Career · Dev Stories · Projects</h2>
            <p>
              금융권 운영 개발 · 배치와 API · 개인 제품 실험
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
            <p className={styles.sectionLabel}>Focus</p>
            <h2>Backend · Batch · Product UI</h2>
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
            <h2>Dev Stories</h2>
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
            <h2>Side Projects</h2>
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
