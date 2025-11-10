import fp from 'fastify-plugin' 
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyRequest {
    user?: any
  }
}

export default fp(async function authChecker(app: FastifyInstance) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not defined')

  app.decorate('verifyJWT', async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers['authorization']
      if (!authHeader) return reply.code(401).send({ error: 'Unauthorized' })

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, secret)
      if(!decoded) return reply.code(403).send({ error: 'Ivalid Token' })

      request.user = decoded
    } catch (error) {
      return reply.code(500).send({ error: 'Invalid token' })
    }
  })
})