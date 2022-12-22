import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from 'libs/server/withHandler';
import client from 'libs/server/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const user = email ? { email } : { phone: +phone };

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).end();
};

export default withHandler('POST', handler);
