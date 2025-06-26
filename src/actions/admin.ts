'use server'

import { UserRole } from '@prisma/client'

import { getCurrentUser } from '@/helpers/current-user'
import { statusMessage } from '@/messages/statusMessage'

export const admin = async () => {
  const user = await getCurrentUser()

  if (user?.role === UserRole.ADMIN) return { success: statusMessage.success.allowedAction }
  else return { error: statusMessage.error.forbiddenAction }
}