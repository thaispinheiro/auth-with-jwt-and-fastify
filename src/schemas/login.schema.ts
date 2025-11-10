import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8),
})