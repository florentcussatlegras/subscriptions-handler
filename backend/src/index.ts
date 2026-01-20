import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Hello World! 🌍');
});

app.get('/subscriptions', async (req, res) => {
  const subs = await prisma.subscription.findMany();
  res.json(subs);
});

app.post('/subscriptions', async (req, res) => {
  const { email, plan } = req.body;
  const sub = await prisma.subscription.create({ data: { email, plan } });
  res.json(sub);
});

app.patch('/subscriptions/:id/cancel', async (req, res) => {
  const id = Number(req.params.id);
  const sub = await prisma.subscription.update({
    where: { id },
    data: { active: false },
  });
  res.json(sub);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
