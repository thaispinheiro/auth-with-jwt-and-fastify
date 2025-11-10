import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/user.service'
import { userBodySchema } from '../schemas/user.schema'

//TODO: Melhorar tratativas de erros
//TODO: jogar userBodySchema.parse(request.body) em um middleware de validação
export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userData = userBodySchema.parse(request.body)
      const user = await UserService.registerUser(userData)
      app.logger.info(`User created: { id: ${user.userId}, timestamp: ${new Date().toISOString()} }`)
      return reply.status(201).send({ message: 'User registered successfully' })
    } catch (error: any) {
      app.logger.error(`User registration failed: ${error?.message ?? 'unknown error'}`)
      return reply.status(400).send({ error: error.message })
    }
  })

}