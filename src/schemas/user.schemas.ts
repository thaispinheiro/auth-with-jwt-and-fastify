import { z } from 'zod'

export const userBodySchema = z.object({
  userName: z.string().min(5).max(50).trim().toLowerCase(),
  email: z.string().email().toLowerCase().trim(),
  //TODO: Mover a validação de senha para um helper
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+\=\[\]{};:'",.<>\/?\\|`~]).+$/,
    "Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"
  ),
})
//TODO: Melhorar validações de senha criando helper para essas validações
.superRefine(({ userName, email, password: pwd, }, ctx) => {
  const lowerPwd = pwd.toLowerCase();
  if (lowerPwd.includes(userName) || (userName && lowerPwd.includes(userName.replace(/\s+/g, '')))) {
    ctx.addIssue({
    code: "custom",
    path: ['password'],
    message: 'Senha não pode conter o nome de usuário',
    })
  }

  if (email && lowerPwd.includes(email.split('@')[0])) {
    ctx.addIssue({
    code: "custom",
    path: ['password'],
    message: 'Senha não pode conter parte do email',
    })
  }

  if (/(.)\1{3,}/.test(pwd)) {
    ctx.addIssue({
    code: "custom",
    path: ['password'],
    message: 'Senha contém muitos caracteres repetidos',
    })
  }
})