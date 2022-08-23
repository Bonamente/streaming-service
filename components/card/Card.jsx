import { useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './Card.module.css';

const classMap = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
};

const Card = ({
  imgUrl = '/static/fallback-card-image.jpg',
  size = 'medium',
  id,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleOnError = () => {
    setImgSrc('/static/fallback-card-image.jpg');
  };

  // Todo refactor
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cn(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          layout="fill"
          onError={handleOnError}
          alt="image"
        />
      </motion.div>
    </div>
  );
};

export default Card;
