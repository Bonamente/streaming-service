/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import cn from 'classnames';
import Card from './Card';
import styles from './CardSection.module.css';

const CardSection = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => (
  <section className={styles.container}>
    <h2 className={styles.title}>{title}</h2>

    <div className={cn(styles.cardWrapper, shouldWrap && styles.wrap)}>
      {videos.map((video, idx) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <a>
            <Card
              id={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </a>
        </Link>
      ))}
    </div>
  </section>
);

export default CardSection;
