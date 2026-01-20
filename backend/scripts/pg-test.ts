import 'dotenv/config'
import pg from 'pg'

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
})

async function test() {
  await client.connect()
  const res = await client.query('SELECT 1')
  console.log(res.rows)
  await client.end()
}

test().catch(console.error)
