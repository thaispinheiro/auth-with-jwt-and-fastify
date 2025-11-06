import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserService } from '../services/user.service'
import { userBodySchema } from '../schemas/user.schemas'

//TODO: Identificar melhorias
export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { userName, email, password } = userBodySchema.parse(request.body)
      const user = await UserService.registerUser({ userName, email, password })
      app.logger.info(`User created: { id: ${user.userId}, timestamp: ${new Date().toISOString()} }`)
      return reply.status(201).send({ message: 'User registered successfully' })
    } catch (error: any) {
      app.logger.error(`User registration failed: ${error?.message ?? 'unknown error'}`)
      return reply.status(400).send({ error: error.message })
    }
  })

}