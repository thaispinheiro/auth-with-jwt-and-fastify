import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import loggerPlugin from './plugins/logger';

export const app = fastify({
   bodyLimit: 1048576, // 1MB
})

app.register(loggerPlugin)

app.register(userRoutes, {
   prefix: '/auth'
})