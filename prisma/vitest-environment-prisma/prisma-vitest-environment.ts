import 'dotenv/config'
import { exec } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import pg from 'pg'
import { promisify } from 'node:util'
import type { Environment } from 'vitest/environments'

const execAsync = promisify(exec)

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not defined')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',

  setup: async () => {
    const schema = `test_${randomUUID().replace(/-/g, '_')}`
    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    const client = new pg.Client({
      connectionString: process.env.DATABASE_URL,
    })

    await client.connect()
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
    await client.end()

    await execAsync('cmd /c npx prisma migrate deploy', {
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
      },
    })

    const { prisma } = await import('@/lib/prisma.js')

    return {
        async teardown(){
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            
            await prisma.$disconnect()
          }
    }
  },
}
