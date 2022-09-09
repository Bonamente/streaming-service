import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import CardSection from '../../components/card/CardSection';

import redirectUser from '../../utils/redirectUser';
import { getMyList } from '../../lib/videos';

import styles from '../../styles/MyList.module.css';

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => (
  <>
    <Head>
      <title>My list</title>
    </Head>

    <Navbar />

    <main className={styles.main}>
      <div className={styles.sectionWrapper}>
        {myListVideos.length > 0 ? (
          <CardSection
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScaleXYFirstCard
          />
        ) : (
          <h2 className={styles.fallbackTitle}>
            Your favorite videos will be displayed here
          </h2>
        )}
      </div>
    </main>
  </>
);

export default MyList;
