import 'dotenv/config'
import { exec } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'
import { prisma } from '@/lib/prisma'

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
  transformMode: 'ssr',

  setup: async () => {
    const schema = randomUUID()
    const datbaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = datbaseUrl

    exec('npx prisma migrate deploy')

    return {
        async teardown(){
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
            await prisma.$disconnect()
        }
    }
  },
}