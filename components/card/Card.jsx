import { useState } from 'react';
import Image from 'next/image';

import styles from './Card.module.css';

const classMap = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
};

const Card = ({
  imgUrl = '/static/fallback-card-image.jpg',
  size = 'medium',
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleOnError = () => {
    // Consider better solution later
    setImgSrc(`${imgUrl.slice(0, -17)}hqdefault.jpg`);
    // setImgSrc('/static/fallback-card-image.jpg');
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          className={styles.cardImg}
          src={imgSrc}
          layout="fill"
          onError={handleOnError}
          alt="image"
        />
      </div>
    </div>
  );
};

export default Card;
