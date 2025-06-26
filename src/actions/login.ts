'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '../../auth'
import { getUserByEmail } from '@/helpers/users'
import { matchPasswords } from '@/helpers/passwords'
import { statusMessage } from '@/messages/statusMessage'

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: statusMessage.error.incorrectFields }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  // Usuário não existe ou está com campos inconsistentes
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: statusMessage.error.incorrectFields }
  }

  // Senha incorreta
  const isPasswordsMatch = await matchPasswords(password, existingUser.password)
  if (!isPasswordsMatch) {
    return { error: statusMessage.error.incorrectFields }
  }

  // Tenta login via NextAuth
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || '/',
    })
  } catch (error) {
    // Se der erro, retorna genérico
    return { error: statusMessage.error.unexpectedError }
  }
}
