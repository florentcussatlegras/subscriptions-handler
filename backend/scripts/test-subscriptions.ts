import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const sub = await prisma.subscription.create({
    data: { email: `test+${Date.now()}@example.com`, plan: 'Pro' }
  })
  console.log(sub)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
