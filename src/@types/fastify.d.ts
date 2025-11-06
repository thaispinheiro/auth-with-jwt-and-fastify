import 'fastify'
import winston from 'winston'

declare module 'fastify' {
  interface FastifyInstance {
    logger: winston.Logger
  }
}