import { FastifyInstance } from "fastify";
import { userRoutes } from './user.route'
import { loginRoutes } from './login.route';

export async function indexRoutes(app : FastifyInstance) {
  app.register(userRoutes, {
    prefix: '/users'
  })

  app.register(loginRoutes, {
    prefix: '/auth'
  })
}