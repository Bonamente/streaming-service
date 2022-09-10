/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cn from 'classnames';

import Navbar from '../../components/navbar/Navbar';
import styles from '../../styles/Video.module.css';
import { getYoutubeVideoById } from '../../lib/videos';
import Like from '../../components/buttons/like/Like';
import Dislike from '../../components/buttons/dislike/Dislike';

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const { videoId } = context.params;

  const videos = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videos.length > 0 ? videos[0] : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['Qz3u06eXf0E', 'TQfATDZY5Y4', '_Gr2zXuEBL0'];
  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));

  return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.length > 0) {
        const { favourited } = data[0];

        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDislike(true);
        }
      }
    };

    handleLikeDislikeService();
  }, [videoId]);

  const runRatingService = async (favourited) => {
    const response = await fetch('/api/stats', {
      method: 'POST',
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favourited = val ? 1 : 0;
    await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDislike;
    setToggleDislike(val);
    setToggleLike(toggleDislike);

    const favourited = val ? 0 : 1;
    await runRatingService(favourited);
  };

  return (
    <div className={styles.container}>
      <Navbar />

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
          height="460"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        />

        <div className={styles.buttonsWrapper}>
          <div className={styles.likeBtnWrapper}>
            <Like selected={toggleLike} onClickHandler={handleToggleLike} />
          </div>

          <Dislike
            selected={toggleDislike}
            onClickHandler={handleToggleDislike}
          />
        </div>

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
