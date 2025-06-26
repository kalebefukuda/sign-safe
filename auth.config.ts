import bcrypt from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

import { getUserByEmail } from '@/helpers/users'
import { LoginSchema } from '@/schemas'

import type { NextAuthOptions } from 'next-auth'

const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const isPasswordsMatch = await bcrypt.compare(password, user.password)
          if (isPasswordsMatch) return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthOptions

export default authOptions
