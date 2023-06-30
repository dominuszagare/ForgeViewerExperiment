import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Basic VR interactions',
    description: (
      <>
        Contains teleportation, UI, object manipulation using controlers or hand tracking
      </>
    ),
  },
  {
    title: 'ThreeJS',
    description: (
      <>
        Built on top of the TreeJS libary
      </>
    ),
  },
  {
    title: 'Desktop mode',
    description: (
      <>
        Even without a VR headset you can interact with the app using mouse and keyboard.
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
