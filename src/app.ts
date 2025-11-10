import fastify from 'fastify'
import loggerPlugin from './plugins/logger.plugin';
import { indexRoutes } from './routes/index.route';

export const app = fastify({
   bodyLimit: 1048576, // 1MB
})

app.register(loggerPlugin)
indexRoutes(app)