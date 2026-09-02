import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';

import ProjectGalaxy, {type GalaxyProject} from '../components/ProjectGalaxy';
import styles from './index.module.css';

type PortfolioProject = GalaxyProject & {
  summary: string;
  href: string;
  status: string;
  updated: string;
  stack: string[];
  signals: string[];
  size: 'feature' | 'wide' | 'tall' | 'compact';
  visual: 'screens' | 'road' | 'transit' | 'prompt' | 'reward' | 'lunch' | 'site' | 'radar';
  desktopImage?: string;
  mobileImage?: string;
  galleryImages?: string[];
  mobileOnly?: boolean;
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
  'Three.js',
  'Apps in Toss',
  'LLM Workflow',
  'WordPress REST',
];

const heroStats = [
  {value: '10y+', label: '금융권 운영 개발'},
  {value: '10', label: '대표 작업물'},
  {value: '2026.09', label: '최근 GitHub 갱신'},
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Road Test 100',
    label: '3D Simulator',
    category: 'Public WebGL',
    signal: '도로주행 시험을 100점 감점제로 만든 세로형 Three.js 게임.',
    summary:
      '신호, 차로, 속도, 방향지시등, 어린이보호구역, 주변 차량까지 점수화한 도로주행 시험 시뮬레이터.',
    href: 'https://eundo.github.io/road-test-100/',
    accent: '#ff4f78',
    status: 'Public',
    updated: '2026.08.30',
    stack: ['Three.js', 'HTML', 'Physics', 'GitHub Pages'],
    signals: ['5x5 city', '34 AI cars', '70점 미만 실격'],
    size: 'feature',
    visual: 'road',
    galleryImages: [
      '/img/projects/road-test-100-drive.png',
      '/img/projects/road-test-100-school.png',
      '/img/projects/road-test-100-start.png',
    ],
  },
  {
    title: 'Shorts Pipeline',
    label: 'Video Workflow',
    category: 'Private Tool',
    signal: '수집부터 TTS, 자막, 추적, FFmpeg 합성까지 한 콘솔에서 처리.',
    summary:
      '정밀 자막, 피사체 추적, TTS 대본/음성, 최종 합성을 탭 단위로 다루는 숏폼 제작 파이프라인.',
    href: '/docs/project/shorts-pipeline',
    accent: '#6552ff',
    status: 'Private',
    updated: '2026.07.23',
    desktopImage: '/img/projects/shorts-pipeline-sample-captions-desktop.png',
    mobileImage: '/img/projects/shorts-pipeline-sample-export-mobile.png',
    stack: ['FastAPI', 'LLM API', 'FFmpeg', 'Docker'],
    signals: ['6 clips', '8 caption lines', '9:16 export'],
    size: 'wide',
    visual: 'screens',
  },
  {
    title: 'Anjeuljido',
    label: 'Apps in Toss',
    category: 'Transit Signal',
    signal: '곧 비는 좌석 신호를 같은 열차 사용자에게 익명 공유.',
    summary:
      '서울 지하철 5호선/9호선 기준으로 하차 예정 좌석 신호, 열차번호 검증, 호차/문/좌석 선택을 설계한 미니앱.',
    href: '/docs/project#fresh-repos',
    accent: '#ffe85c',
    status: 'Private',
    updated: '2026.08.29',
    stack: ['React', 'TypeScript', 'Vite', 'Apps in Toss'],
    signals: ['line 5/9', 'train proof', 'seat map'],
    size: 'tall',
    visual: 'transit',
  },
  {
    title: 'Prompt Coach',
    label: 'AI Utility',
    category: 'Apps in Toss',
    signal: '큰 틀을 질문 3개 안에서 실행 가능한 프롬프트로 정리.',
    summary:
      '대략적인 요청을 분야, 산출물, 검증 기준으로 나누고 부족한 조건만 물어 완성형 프롬프트를 만든다.',
    href: '/docs/project#fresh-repos',
    accent: '#6552ff',
    status: 'Private',
    updated: '2026.08.28',
    stack: ['React', 'TypeScript', 'Prompt Design'],
    signals: ['3 questions', 'copy/share', 'local fallback'],
    size: 'wide',
    visual: 'prompt',
  },
  {
    title: 'Point Switch',
    label: 'Reward Safety',
    category: 'Apps in Toss',
    signal: '보상형 광고와 포인트 지급 경계를 서버 중심으로 분리.',
    summary:
      '10회 충전과 마지막 지급 광고를 분리하고, action ticket과 멱등성으로 보상 플로우를 안전하게 설계한 미니앱.',
    href: '/docs/project#fresh-repos',
    accent: '#53c8ff',
    status: 'Private',
    updated: '2026.08.21',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Worker'],
    signals: ['10 + 1 ads', 'idempotency', 'server boundary'],
    size: 'compact',
    visual: 'reward',
  },
  {
    title: 'Content Studio',
    label: 'Publishing Console',
    category: 'Private Tool',
    signal: '주제 추천, SEO 검수, 이미지 패키지, WordPress draft 저장.',
    summary:
      '콘텐츠 운영에서 반복되는 주제 선정, 초안 생성, SEO 체크, 이미지 구성을 한 대시보드로 묶었다.',
    href: '/docs/project/eundo-content-studio',
    accent: '#00d6b3',
    status: 'Private',
    updated: '2026.07.29',
    desktopImage: '/img/projects/eundo-content-studio-dashboard-desktop.png',
    mobileImage: '/img/projects/eundo-content-studio-dashboard-mobile.png',
    stack: ['React', 'Express', 'Python', 'WordPress REST'],
    signals: ['10 topics', '3 picked', 'WP draft'],
    size: 'wide',
    visual: 'screens',
  },
  {
    title: 'Reread Bookshelf',
    label: 'Local-first',
    category: 'Mobile Web',
    signal: '웹소설과 전자책을 기억 단서, 태그, OCR로 다시 찾는 책장.',
    summary:
      'RIDI, 시리즈, 카카오페이지 기록을 모바일 시트와 스크린샷 OCR 중심으로 저장하는 개인 기록장.',
    href: '/docs/project/reread-bookshelf',
    accent: '#00d6b3',
    status: 'Private',
    updated: '2026.09.01',
    desktopImage: '/img/projects/reread-bookshelf-sample-detail-mobile.png',
    mobileImage: '/img/projects/reread-bookshelf-sample-detail-mobile.png',
    mobileOnly: true,
    stack: ['JavaScript', 'PWA', 'localStorage', 'OCR'],
    signals: ['8 records', 'OCR input', 'mobile sheet'],
    size: 'compact',
    visual: 'screens',
  },
  {
    title: 'Source Radar',
    label: 'Research Queue',
    category: 'Private Tool',
    signal: 'YouTube 후보가 쌓이기 전 품질 게이트와 스킵 학습으로 거른다.',
    summary:
      '제목 훅, 채널명 오탐, 설명문-only 신호를 나눠 숏폼 소스 검토 queue의 잡음을 줄이는 리서치 도구.',
    href: '/docs/project/shorts-source-radar',
    accent: '#ffe85c',
    status: 'Private',
    updated: '2026.08.04',
    desktopImage: '/img/projects/shorts-source-radar-empty-mobile.png',
    mobileImage: '/img/projects/shorts-source-radar-empty-mobile.png',
    mobileOnly: true,
    stack: ['Node.js', 'Netlify Functions', 'Notion API'],
    signals: ['quality gate', 'skip learning', 'mobile first'],
    size: 'compact',
    visual: 'radar',
  },
  {
    title: 'Lunch Networking',
    label: 'Workplace Social',
    category: 'Apps in Toss',
    signal: '평일 점심시간을 직무 네트워킹 슬롯으로 쓰는 미니앱 MVP.',
    summary:
      '직장인의 점심시간을 기준으로 이종 직무 매칭, 일정 후보, 가벼운 네트워킹 흐름을 실험하는 Apps-in-Toss 프로젝트.',
    href: '/docs/project#fresh-repos',
    accent: '#ff70cf',
    status: 'Private',
    updated: '2026.08.09',
    stack: ['TypeScript', 'Apps in Toss', 'MVP'],
    signals: ['weekday lunch', 'matching', 'mobile flow'],
    size: 'compact',
    visual: 'lunch',
  },
  {
    title: 'eundo.today',
    label: 'Portfolio System',
    category: 'Public Site',
    signal: 'Docusaurus 블로그를 포트폴리오와 배포 파이프라인으로 재구성.',
    summary:
      '경력, 개발 회고, 개인 프로젝트를 나눠 보여주고 GitHub push 기반 Netlify 배포까지 연결한 공개 포트폴리오.',
    href: '/docs/project/portfolio-site',
    accent: '#6552ff',
    status: 'Public',
    updated: '2026.09.02',
    desktopImage: '/img/projects/portfolio-site-home-desktop.png',
    mobileImage: '/img/projects/portfolio-site-home-mobile.png',
    stack: ['Docusaurus', 'TypeScript', 'Netlify', 'GitHub'],
    signals: ['portfolio', 'docs', 'deploy'],
    size: 'compact',
    visual: 'site',
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
    description: '경력과 맡았던 시스템',
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

function ProjectVisual({project}: {project: PortfolioProject}) {
  if (project.visual === 'road' && project.galleryImages) {
    return (
      <div className={styles.roadScreens}>
        {project.galleryImages.map((image, index) => (
          <img key={image} src={image} alt={`${project.title} screen ${index + 1}`} />
        ))}
      </div>
    );
  }

  if (project.visual !== 'screens' && project.visual !== 'site') {
    return <SyntheticVisual project={project} />;
  }

  return (
    <div className={`${styles.projectVisual} ${project.mobileOnly ? styles.mobileOnlyVisual : ''}`}>
      {!project.mobileOnly && project.desktopImage && (
        <img
          className={styles.desktopShot}
          src={project.desktopImage}
          alt={`${project.title} desktop screen`}
        />
      )}
      {project.mobileImage && (
        <img
          className={project.mobileOnly ? styles.mobileOnlyShot : styles.mobileShot}
          src={project.mobileImage}
          alt={`${project.title} mobile screen`}
        />
      )}
    </div>
  );
}

function SyntheticVisual({project}: {project: PortfolioProject}) {
  return (
    <div
      className={`${styles.syntheticVisual} ${styles[`visual_${project.visual}`]}`}
      aria-label={`${project.title} visual preview`}>
      <span className={styles.visualBadge}>{project.category}</span>
      <div className={styles.visualStage}>
        {project.visual === 'road' && (
          <>
            <div className={styles.roadGrid}>
              {Array.from({length: 16}).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <b className={styles.carShape} />
            <strong>100</strong>
          </>
        )}
        {project.visual === 'transit' && (
          <>
            <div className={styles.trainLine}>
              {['화곡', '당산', '여의도', '노량진'].map((station) => (
                <i key={station}>{station}</i>
              ))}
            </div>
            <div className={styles.seatMap}>
              {Array.from({length: 18}).map((_, index) => (
                <b key={index} className={index === 9 ? styles.hotSeat : ''} />
              ))}
            </div>
          </>
        )}
        {project.visual === 'prompt' && (
          <div className={styles.promptStack}>
            <i>원하는 결과</i>
            <i>부족한 조건 3개</i>
            <i>실행 프롬프트</i>
          </div>
        )}
        {project.visual === 'reward' && (
          <div className={styles.rewardDial}>
            {Array.from({length: 10}).map((_, index) => (
              <i key={index} style={{'--slot-index': index} as React.CSSProperties} />
            ))}
            <strong>10</strong>
          </div>
        )}
        {project.visual === 'lunch' && (
          <div className={styles.lunchSlots}>
            {['12:00', '12:30', '13:00'].map((time) => (
              <i key={time}>{time}</i>
            ))}
          </div>
        )}
        {project.visual === 'radar' && (
          <div className={styles.radarLines}>
            {project.signals.map((signal) => (
              <i key={signal}>{signal}</i>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onFocus,
  isActive,
  projectRef,
}: {
  project: PortfolioProject;
  index: number;
  onFocus: () => void;
  isActive: boolean;
  projectRef: (node: HTMLAnchorElement | null) => void;
}) {
  return (
    <a
      id={`project-${index}`}
      ref={projectRef}
      data-project-index={index}
      className={`${styles.projectCard} ${isActive ? styles.projectCardActive : ''}`}
      href={project.href}
      style={
        {
          '--project-accent': project.accent,
          '--card-index': index,
        } as React.CSSProperties
      }
      onMouseEnter={onFocus}
      onFocus={onFocus}>
      <span className={styles.projectStepNumber}>{String(index + 1).padStart(2, '0')}</span>
      <div className={styles.projectStepVisual}>
        <ProjectVisual project={project} />
      </div>
      <div className={styles.projectCardBody}>
        <div>
          <div className={styles.projectCardTop}>
            <em>{project.label}</em>
            <span>{project.category}</span>
          </div>
          <p className={styles.projectMeta}>
            {project.status} / Updated {project.updated}
          </p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div>
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
      </div>
    </a>
  );
}

function ProjectShowcasePreview({
  project,
  index,
  total,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
}) {
  return (
    <a
      className={styles.showcasePreview}
      href={project.href}
      style={{'--project-accent': project.accent} as React.CSSProperties}
      aria-label={`${project.title} project detail`}>
      <div className={styles.showcasePreviewTop}>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <em>{project.label}</em>
      </div>
      <ProjectVisual project={project} />
      <div className={styles.showcasePreviewBody}>
        <p className={styles.projectMeta}>
          {project.status} / Updated {project.updated}
        </p>
        <h3>{project.title}</h3>
        <p>{project.signal}</p>
      </div>
    </a>
  );
}

function MotionRail({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: PortfolioProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const progress = `${((activeIndex + 1) / projects.length) * 100}%`;

  return (
    <nav className={styles.motionRail} aria-label="Project scroll navigation">
      <span className={styles.motionRailTrack} aria-hidden="true">
        <i style={{height: progress}} />
      </span>
      {projects.map((project, index) => (
        <button
          key={project.title}
          type="button"
          className={`${styles.motionRailDot} ${
            index === activeIndex ? styles.motionRailDotActive : ''
          }`}
          style={{'--project-accent': project.accent} as React.CSSProperties}
          onClick={() => {
            onSelect(index);
          }}>
          <span>
            {String(index + 1).padStart(2, '0')} {project.title}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default function Home(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndexRef = useRef(0);
  const scrollIntentRef = useRef<number | null>(null);
  const scrollIntentTimeoutRef = useRef<number | null>(null);
  const selectProject = useCallback((index: number) => {
    const boundedIndex = Math.min(Math.max(index, 0), portfolioProjects.length - 1);

    activeIndexRef.current = boundedIndex;
    setActiveIndex((currentIndex) => (currentIndex === boundedIndex ? currentIndex : boundedIndex));
  }, []);
  const scrollToProject = useCallback(
    (index: number) => {
      const boundedIndex = Math.min(Math.max(index, 0), portfolioProjects.length - 1);
      const target = document.getElementById(`project-${boundedIndex}`);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      scrollIntentRef.current = boundedIndex;
      selectProject(boundedIndex);

      if (scrollIntentTimeoutRef.current) {
        window.clearTimeout(scrollIntentTimeoutRef.current);
      }

      target?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });

      scrollIntentTimeoutRef.current = window.setTimeout(
        () => {
          if (scrollIntentRef.current === boundedIndex) {
            scrollIntentRef.current = null;
            selectProject(boundedIndex);
          }

          scrollIntentTimeoutRef.current = null;
        },
        prefersReducedMotion ? 0 : 1200,
      );
    },
    [selectProject],
  );
  const activeProject = portfolioProjects[activeIndex] ?? portfolioProjects[0];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const page = pageRef.current;
    let animationFrame = 0;

    const updateScrollState = () => {
      const scrollableHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
      const viewportAnchor = window.innerHeight * 0.52;
      let nextIndex = activeIndexRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      page?.style.setProperty('--scroll-progress', scrollProgress.toFixed(4));

      if (scrollIntentRef.current !== null) {
        animationFrame = 0;
        return;
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const rect = card.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndexRef.current) {
        selectProject(nextIndex);
      }

      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', requestUpdate, {passive: true});
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (scrollIntentTimeoutRef.current) {
        window.clearTimeout(scrollIntentTimeoutRef.current);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [selectProject]);

  return (
    <Layout
      title="박은도 | Backend / Batch / Product UI"
      description="박은도의 개발자 포트폴리오입니다. 금융권 운영 개발, 배치와 API, 개인 프로젝트를 정리합니다.">
      <main ref={pageRef} className={styles.portfolioPage}>
        <div className={styles.scrollProgress} aria-hidden="true" />
        <MotionRail projects={portfolioProjects} activeIndex={activeIndex} onSelect={scrollToProject} />
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              <span>박은도</span>
              Backend / Batch / Product UI
            </h1>
            <p>금융권 운영 개발을 해왔고, 개인 프로젝트는 직접 쓰려고 만듭니다.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#selected-work">
                Projects
              </a>
              <a className={styles.secondaryAction} href="https://github.com/eundo">
                GitHub
              </a>
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

          <div className={styles.galaxyStage}>
            <ProjectGalaxy
              projects={portfolioProjects}
              activeIndex={activeIndex}
              onSelect={selectProject}
            />
            <a
              className={styles.activeProjectPanel}
              href={activeProject.href}
              style={{'--project-accent': activeProject.accent} as React.CSSProperties}
              aria-label={`${activeProject.title} detail`}>
              <span>{activeProject.label}</span>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.signal}</p>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd>{activeProject.status}</dd>
                </div>
                <div>
                  <dt>Updated</dt>
                  <dd>{activeProject.updated}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{activeProject.stack.slice(0, 3).join(' / ')}</dd>
                </div>
              </dl>
            </a>
          </div>
        </section>

        <section className={styles.stackTicker} aria-label="Technology stack">
          <div>
            {[...stackTicker, ...stackTicker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="selected-work" className={styles.selectedWork}>
          <div className={styles.showcaseHeader}>
            <div>
              <h2>Recent Builds</h2>
              <p>GitHub 기준 2026.09.02 업데이트.</p>
            </div>
            <span>
              {String(activeIndex + 1).padStart(2, '0')} / {portfolioProjects.length}
            </span>
          </div>
          <div className={styles.projectShowcase}>
            <aside className={styles.showcaseSticky} aria-label="Active project preview">
              <ProjectShowcasePreview
                project={activeProject}
                index={activeIndex}
                total={portfolioProjects.length}
              />
            </aside>
            <div className={styles.projectBoard}>
              {portfolioProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isActive={index === activeIndex}
                  projectRef={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  onFocus={() => selectProject(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.repoLane} aria-label="Recent repository updates">
          {portfolioProjects.slice(0, 8).map((project) => (
            <a
              key={project.title}
              href={project.href}
              style={{'--project-accent': project.accent} as React.CSSProperties}>
              <span>{project.updated}</span>
              <strong>{project.title}</strong>
              <em>{project.category}</em>
            </a>
          ))}
        </section>

        <section className={styles.routeSection}>
          <div className={styles.routeIntro}>
            <h2>Career / Stories / Products</h2>
            <p>경력은 짧게, 회고는 기술 중심, 프로젝트는 화면 중심.</p>
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
            <p>운영 개발에서 남긴 기술 기록입니다.</p>
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
