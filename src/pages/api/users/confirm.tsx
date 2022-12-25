import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token } = req.body;
  console.log(token);

  return res.status(200).end();
};

export default withHandler('POST', handler);
