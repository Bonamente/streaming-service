/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import Link from 'next/link';

import Card from './Card';
import styles from './CardSection.module.css';

const CardSection = ({ title, videos = [], size }) => (
  <section className={styles.container}>
    <h2 className={styles.title}>{title}</h2>

    <div className={styles.cardWrapper}>
      {videos.map((video, idx) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <a>
            <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
          </a>
        </Link>
      ))}
    </div>
  </section>
);

export default CardSection;
