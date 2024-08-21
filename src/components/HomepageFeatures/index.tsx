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
        Docusaurus was designed from the ground up to be easily installed and used
        to get your website up and running quickly.
    </>
);

const DescriptionFocusOnMatters = () => (
    <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
    </>
);

const DescriptionPoweredByReact = () => (
    <>
        Extend or customize your website layout by reusing React. Docusaurus can be
        extended while reusing the same header and footer.
    </>
);

// Feature List
const FEATURE_LIST: FeatureItem[] = [
    {
        title: 'Easy to Use',
        Svg: SVG_PATHS.EASY_TO_USE,
        description: <DescriptionEasyToUse/>,
    },
    {
        title: 'Focus on What Matters',
        Svg: SVG_PATHS.FOCUS_ON_MATTERS,
        description: <DescriptionFocusOnMatters/>,
    },
    {
        title: 'Powered by React',
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
