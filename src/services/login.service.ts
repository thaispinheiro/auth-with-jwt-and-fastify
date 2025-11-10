import { User } from '../model/user.model'
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticateInput } from '../insterfaces/auth.interface'

export class LoginService {
  static async authenticateUser({ email, password }: AuthenticateInput) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid credentials')

    const passwordMatch = bycript.compareSync(password, user.password)
    if (!passwordMatch) throw new Error('Invalid credentials')
    return user
  }

  static async generateToken(id: string) {
    return jwt.sign(
            { sub: id },
            process.env.JWT_SECRET!,
            { expiresIn: parseInt(process.env.JWT_EXPIRES || '1h') }
          )
  }

}