import { app } from './app'
import { env } from './env'
import mongoose from 'mongoose'

async function startServer() {
  try {
    await mongoose.connect(env.DATABASE_URL, {
      connectTimeoutMS: 30000,
    })
    console.log('Connected to MongoDB')

    app.listen({ port: env.PORT }).then(() => {
      console.log(`Server is running at http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

startServer()
