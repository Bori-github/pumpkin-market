import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, phone } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const user = email ? { email } : phone ? { phone: +phone } : null;

  if (!user) return res.status(400).json({ ok: false });

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

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TWILIO_PHONENUMBER!,
      body: `로그인 토큰은 ${payload} 입니다.`,
    });

    console.log(message);
  }

  return res.status(200).json({ ok: true });
};

export default withHandler('POST', handler);
