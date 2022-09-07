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
  shouldScale = true,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleOnError = () => {
    setImgSrc('/static/fallback-card-image.jpg');
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cn(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
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
