import { jwtVerify } from 'jose';

const verifyToken = async (token) => {
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      return verified.payload && verified.payload?.issuer;
    }

    return null;
  } catch (err) {
    console.error({ err });

    return null;
  }
};

export default verifyToken;
