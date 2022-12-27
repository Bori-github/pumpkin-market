import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'pumpkin_session',
  password: `${process.env.IRON_SESSION_PASSWORD}`,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const withApiSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};
