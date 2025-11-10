import { randomUUID } from 'node:crypto'
import { User } from '../model/user.model'
import { UserBodyInput } from '../insterfaces/user.interface'

export class UserService {
  static async registerUser({ userName, email, password }: UserBodyInput) {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error('User invalid')

    const userId = randomUUID()
    const user = new User({
      userId, userName, email, password 
    })

    await user.save()
    return { userId, email, userName }
  }
}