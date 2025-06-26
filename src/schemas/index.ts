import * as z from 'zod'
import { UserRole } from '@prisma/client'

export const LoginSchema = z.object({
  email: z.string().trim().min(1, ' • required').email(' • must be a valid email'),
  password: z
    .string()
    .trim()
    .min(1, ' • required')
    .regex(/^[a-zA-Z0-9]+$/i, ' • latin letters and numbers allowed'),
  code: z.optional(
    z
      .string()
      .trim()
      .min(1, ' • required')
      .regex(/^[0-9]+$/i, ' • only numbers allowed')
  )
})

export const RegisterSchema = z.object({
  email: z.string().trim().min(1, ' • required').email(' • must be a valid email'),
  password: z
    .string()
    .trim()
    .min(1, ' • required')
    .regex(/^[a-zA-Z0-9]+$/i, ' • use latin letters or  numbers')
    .min(3, ' • at least 3 characters'),
  name: z.string().min(1, ' • required').min(2, ' • at least 2 characters')
})

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().min(1, ' • required').email(' • must be a valid email')
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, ' • required')
    .regex(/^[a-zA-Z0-9]+$/i, ' • use latin letters or  numbers')
    .min(8, ' • at least 8 characters')
})

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().trim().email(' • must be a valid email')),
  password: z.optional(
    z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]+$/i, ' • use latin letters or  numbers')
      .min(8, ' • at least 8 characters')
  ),
  updatedPassword: z.optional(
    z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]+$/i, ' • use latin letters or  numbers')
      .min(8, ' • at least 8 characters')
  ),
  isTwoFactorEnabled: z.optional(z.boolean())
})