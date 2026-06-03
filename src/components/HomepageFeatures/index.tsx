import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: JSX.Element;
};

const FEATURE_LIST: FeatureItem[] = [
  {
    title: '배운 것을 기록합니다',
    imageSrc: require('@site/static/img/IMG_1116.JPG').default,
    description: (
      <>
        개발하며 마주친 문제, 해결 과정, 다시 참고할 내용을 짧고 꾸준하게
        정리합니다.
      </>
    ),
  },
  {
    title: '프로젝트 경험을 남깁니다',
    imageSrc: require('@site/static/img/IMG_1118.JPG').default,
    description: (
      <>
        실제 업무와 사이드 프로젝트에서 얻은 설계 판단, 구현 방식, 회고를
        모읍니다.
      </>
    ),
  },
  {
    title: '성장을 추적합니다',
    imageSrc: require('@site/static/img/IMG_1117.JPG').default,
    description: (
      <>
        책, 기술 문서, 개발 회고를 연결해서 다음 작업에 바로 쓸 수 있는
        지식으로 남깁니다.
      </>
    ),
  },
];

function Feature({title, imageSrc, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageSrc} className={styles.featureImage} alt="" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FEATURE_LIST.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
