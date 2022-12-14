import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './Banner.module.css';

const Banner = ({ title, subTitle, imgUrl, videoId }) => {
  const router = useRouter();

  const handleOnPlay = (e) => {
    e.preventDefault();
    router.push(`video/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.leftWrapper}>
          <div className={styles.left}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subTitle}>{subTitle}</h3>
            <div className={styles.btnWrapper}>
              <button
                className={styles.btnWithIcon}
                onClick={handleOnPlay}
                type="button"
              >
                <Image
                  src="/static/play_arrow.svg"
                  alt="Play icon"
                  width="32px"
                  height="32px"
                />
                <span className={styles.btnText}>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.bannerImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
    </div>
  );
};

export default Banner;
