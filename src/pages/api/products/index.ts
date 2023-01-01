import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price,
        description,
        image: 'test',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(200).json({
      ok: true,
      product,
    });
  }

  if (req.method === 'GET') {
    const products = await client.product.findMany({});

    return res.status(200).json({
      ok: true,
      products,
    });
  }
};

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
