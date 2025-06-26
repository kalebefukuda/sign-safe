import bcrypt from 'bcrypt'

export const matchPasswords = async (
  password: string,
  hashedPassword: string | null | undefined
) => {
  return await bcrypt.compare(password, <string>hashedPassword)
}