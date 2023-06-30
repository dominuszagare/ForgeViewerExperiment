import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Visulize and interact',
    description: (
      <>
        Seamlessly view and interact with architectural models in the browser.
      </>
    ),
  },
  {
    title: 'Autodesk Cloud API',
    description: (
      <>
        Use Autodesk Forge API to convert and sync models between different formats and users.
      </>
    ),
  },
  {
    title: 'Present',
    description: (
      <>
        Present your models to clients and colleagues in the browser.
      </>
    ),
  },
];
// <Svg className={styles.featureSvg} role="img" />
function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
