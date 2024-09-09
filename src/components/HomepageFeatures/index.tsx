import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: string; // Change the type to string
  description: JSX.Element;
};

// SVG Paths Constants
const SVG_PATHS = {
    EASY_TO_USE: require('@site/static/img/IMG_1116.JPG').default,
    FOCUS_ON_MATTERS: require('@site/static/img/IMG_1118.JPG').default,
    POWERED_BY_REACT: require('@site/static/img/IMG_1117.JPG').default,
};

// Description Functions
const DescriptionEasyToUse = () => (
    <>
        With every step you take, there's a sense of pride.
        This space was crafted to make your journey as effortless as possible.
    </>
);

const DescriptionFocusOnMatters = () => (
    <>
        Focus on what speaks to your heart.
        It’s in these moments that your true brilliance will shine.
    </>
);

const DescriptionPoweredByReact = () => (
    <>
        The energy within you is what drives everything forward.
        It’s your passion that brings this space to life.
    </>
);

// Feature List
const FEATURE_LIST: FeatureItem[] = [
    {
        title: 'Proud of Every Step',
        Svg: SVG_PATHS.EASY_TO_USE,
        description: <DescriptionEasyToUse/>,
    },
    {
        title: 'Embrace What Truly Matters',
        Svg: SVG_PATHS.FOCUS_ON_MATTERS,
        description: <DescriptionFocusOnMatters/>,
    },
    {
        title: 'Powered by Your Passion',
        Svg: SVG_PATHS.POWERED_BY_REACT,
        description: <DescriptionPoweredByReact/>,
    },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <img src={Svg} className={styles.featureSvg} role="img" alt={title} /> {/* Use img tag */}
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
          {FEATURE_LIST.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
