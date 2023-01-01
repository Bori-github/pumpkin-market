import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import twilio from 'twilio';
import { smtpTransport } from 'libs/server/email';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, phone } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const user = email ? { email } : phone ? { phone: phone } : null;

  if (!user) return res.status(400).json({ ok: false });

  await client.token.create({
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
    await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TWILIO_PHONENUMBER!,
      body: `로그인 토큰은 ${payload} 입니다.`,
    });
  }

  if (email) {
    const mailOptions = {
      from: process.env.NODE_MAILER_ID,
      to: email,
      subject: 'Pumpkin Market 인증 메일',
      html: `<strong>인증번호는 ${payload} 입니다.</strong>`,
      text: 'Pumpkin Market 인증 메일',
    };

    await smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        res.status(400).json({ ok: false });
      } else {
        res.status(200).json({ ok: true });
      }
      smtpTransport.close();
    });
  }

  return res.status(200).json({ ok: true });
};

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
