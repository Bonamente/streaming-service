/* eslint-disable jsx-a11y/iframe-has-title */
import { useRouter } from 'next/router';
import Modal from 'react-modal';

import cn from 'classnames';
import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();

  const video = {
    title:
      'The Night Is Darkest Right Before The Dawn. And I Promise You, The Dawn Is Coming.',
    publishTime: '2008-18-07',
    description: 'Batman tries to hang on as best he can',
    channelTitle: 'Warner Bros. Pictures',
    viewCount: 100000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        />

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cn(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cn(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
