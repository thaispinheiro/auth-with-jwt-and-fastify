import winston from "winston"
import fp from 'fastify-plugin'

const loggerPlugin = fp(async (fastify) => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'logs/audit.log' }),
      new winston.transports.Console(),
    ],
  })

  fastify.decorate('logger', logger)
})

export default loggerPlugin