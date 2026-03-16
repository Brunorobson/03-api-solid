import 'dotenv/config'
import zod = require('zod')

const envSchema = zod.z.object({
  NODE_ENV: zod.z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: zod.z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid environment variables', _env.error.format())

  throw new Error('invalid environment variables')
}
const env = _env.data

export = env
