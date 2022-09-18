/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import verifyToken from './lib/utils';

const middleware = async (req) => {
  const token = req ? req.cookies.get('token') : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;

  if (
    pathname.includes('/api/login') ||
    userId ||
    pathname.includes('/static')
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.rewrite(url);
  }
};

export default middleware;
