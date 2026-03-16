import fastify = require('fastify')
import env = require('./env')
import prismaClient = require('../generated/prisma/client')

const app = fastify()
const prisma = new prismaClient.PrismaClient({
  accelerateUrl: env.DATABASE_URL,
})

export = app
