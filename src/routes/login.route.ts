import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { LoginService } from '../services/login.service'
import { loginBodySchema } from '../schemas/login.schema'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const loginData = loginBodySchema.parse(request.body)
    const user = await LoginService.authenticateUser(loginData)
    
    try {
      const token = LoginService.generateToken(user.id)
      return reply.status(200).send({ token })
    } catch (error: any) {
      app.logger.error(`Token non generated for the user: { id: ${user.id}, timestamp: ${new Date().toISOString()} }`)
      return reply.status(500).send({ error: error.message })
    }
  })
}