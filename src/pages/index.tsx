import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const portfolioLinks = [
  {
    title: 'Career Profile',
    description: '금융, 보험, 마이데이터 도메인에서 쌓은 약 10년의 개발 이력',
    href: '/docs/aboutMe/PARK%20EUNDO',
  },
  {
    title: 'Projects',
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
  'Java/Spring Boot 기반 백엔드',
  'React/Angular 프론트엔드',
  'Oracle/PostgreSQL 데이터 처리',
  '배치, 인증, 운영 자동화',
];

const heroStats = [
  {value: '10y+', label: 'Finance / Insurance'},
  {value: 'Full-stack', label: 'Backend to Frontend'},
  {value: 'Product', label: 'Private tools in progress'},
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
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Portfolio"
      description="Eundo Park의 개발자 포트폴리오입니다. 금융, 보험, 마이데이터 프로젝트와 개발 회고를 정리합니다.">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Full-stack Developer Portfolio</p>
            <h1>박은도</h1>
            <p className={styles.heroCopy}>
              금융, 보험, 마이데이터 도메인에서 운영 시스템을 개선하고 제품
              경험을 구현해온 개발자입니다.
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
          <div className={styles.heroVisual} aria-label={`${siteConfig.title} logo`}>
            <img className={styles.heroMark} src="/img/brand-mark.svg" alt="" />
            <div className={styles.heroPanel}>
              <span>Current Focus</span>
              <strong>운영 흐름을 읽고 제품 경험으로 정리하는 개발</strong>
            </div>
            <div className={styles.heroPanel}>
              <span>Stack</span>
              <strong>Spring Boot · React · Oracle · PostgreSQL</strong>
            </div>
          </div>
        </section>

        <section className={styles.strengthBand} aria-label="Core strengths">
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
