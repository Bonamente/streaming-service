import jwt from 'jsonwebtoken';
import magicAdmin from '../../lib/magic-server';
import { createNewUser, isNewUser } from '../../lib/db/hasura';
import setTokenCookie from '../../lib/cookies';

const login = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : '';
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      const isNewUserQuery = await isNewUser(token, metadata.issuer);

      if (isNewUserQuery) {
        await createNewUser(token, metadata);
      }

      setTokenCookie(token, res);
      res.send({ done: true });
    } catch (err) {
      console.error('Something went wrong logging in', err);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
};

export default login;
