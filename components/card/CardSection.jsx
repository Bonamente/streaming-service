/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import cn from 'classnames';
import { motion } from 'framer-motion';
import Card from './Card';
import styles from './CardSection.module.css';

const CardSection = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScaleXYFirstCard,
}) => {
  const scaleY = { whileHover: { scaleY: 1.1 }, whileFocus: { scaleY: 1.1 } };
  const scaleXY = { whileHover: { scale: 1.1 }, whileFocus: { scale: 1.1 } };

  return (
    <section className={cn(styles.container, shouldWrap && styles.textCenter)}>
      <h2 className={styles.title}>{title}</h2>

      <div
        className={cn(
          styles.cardWrapper,
          shouldWrap && styles.wrap,
          shouldWrap && styles.center
        )}
      >
        {videos.map((video, idx) => {
          let scaleType;

          if (shouldScaleXYFirstCard) {
            scaleType = scaleXY;
          } else if (idx === 0) {
            scaleType = scaleY;
          } else {
            scaleType = scaleXY;
          }

          return (
            <Link key={video.id} href={`/video/${video.id}`} passHref>
              <motion.a className={styles.cardMotionWrapper} {...scaleType}>
                <Card imgUrl={video.imgUrl} size={size} />
              </motion.a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CardSection;
