/* eslint-disable consistent-return */
import magicAdmin from '../../lib/magic-server';
import { removeTokenCookie } from '../../lib/cookies';
import verifyToken from '../../lib/utils';

const logout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const { token } = req.cookies;
    const userId = await verifyToken(token);
    removeTokenCookie(res);

    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (err) {
      console.error('Error occurred while logging out magic user', err);
    }

    res.writeHead(302, { Location: '/login' });
    res.end();
  } catch (err) {
    console.error({ err });
    res.status(401).json({ message: 'User is not logged in' });
  }
};

export default logout;
