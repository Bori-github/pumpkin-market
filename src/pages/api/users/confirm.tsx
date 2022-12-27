import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token } = req.body;
  const getToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });

  if (!getToken) return res.status(404).json({ ok: false });

  req.session.user = {
    id: getToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: getToken.userId,
    },
  });

  return res.status(200).json({ ok: true });
};

export default withApiSession(withHandler('POST', handler));
