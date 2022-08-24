/* eslint-disable react/no-array-index-key */
import Card from './Card';
import styles from './CardSection.module.css';

const CardSection = ({ title, videos = [], size }) => (
  <section className={styles.container}>
    <h2 className={styles.title}>{title}</h2>

    <div className={styles.cardWrapper}>
      {videos.map((video, idx) => (
        <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
      ))}
    </div>
  </section>
);

export default CardSection;
