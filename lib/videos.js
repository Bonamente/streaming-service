const getCommonVideos = async (url) => {
  const { YOUTUBE_API_KEY } = process.env;

  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3';

    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.log('Youtube API error', data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;

      return {
        id,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (err) {
    console.log('Something went wrong', err);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;

  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';

  return getCommonVideos(URL);
};
