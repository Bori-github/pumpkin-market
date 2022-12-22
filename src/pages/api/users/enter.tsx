import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from 'libs/server/withHandler';
import client from 'libs/server/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone } = req.body;
  const payload = email ? { email } : { phone: +phone };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: 'Anonymous',
      ...payload,
    },
    update: {},
  });

  return res.status(200).end();
};

export default withHandler('POST', handler);
