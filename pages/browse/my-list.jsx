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
        <CardSection
          title="My List"
          videos={myListVideos}
          size="small"
          shouldWrap
          shouldScale={false}
        />
      </div>
    </main>
  </>
);

export default MyList;
