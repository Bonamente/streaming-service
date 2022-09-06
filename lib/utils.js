import jwt from 'jsonwebtoken';

const verifyToken = async (token) => {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;

    return userId;
  }

  return null;
};

export default verifyToken;
