import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end('Unauthorized');

  if (req.method === 'GET') {
    return res.json(await prisma.make.findMany());
  }
  if (req.method === 'POST') {
    const { name } = req.body;
    return res.json(await prisma.make.create({ data: { name } }));
  }
  res.status(405).end();
}
