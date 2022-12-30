import { PrismaClient } from '@prisma/client';

const globalClient = global as unknown as { client: PrismaClient };

const client = globalClient.client || new PrismaClient();

if (process.env.NODE_ENV === 'development') globalClient.client = client;

export default client;
