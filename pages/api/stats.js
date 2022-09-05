import jwt from 'jsonwebtoken';
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from '../../lib/db/hasura';

const stats = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(403).send({});
    } else {
      const inputParams = req.method === 'POST' ? req.body : req.query;
      const { videoId } = inputParams;

      if (videoId) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;

        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === 'POST') {
          const { favourited, watched = true } = req.body;

          if (doesStatsExist) {
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });

            res.send({ data: response });
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });

            res.send({ data: response });
          }
        } else if (doesStatsExist) {
          res.send(findVideo);
        } else {
          res.status(404);
          res.send({ user: null, message: 'Video not found' });
        }
      }
    }
  } catch (err) {
    console.error('Error occurred /stats', err);
    res.status(500).send({ done: false, error: err?.message });
  }
};

export default stats;
