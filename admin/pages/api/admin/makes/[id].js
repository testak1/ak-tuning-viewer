import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end('Unauthorized');
  const id = Number(req.query.id);

  if (req.method === 'PUT') {
    const { name } = req.body;
    return res.json(await prisma.make.update({ where: { id }, data: { name } }));
  }
  if (req.method === 'DELETE') {
    await prisma.make.delete({ where: { id } });
    return res.status(204).end();
  }
  res.status(405).end();
}
