import { z } from 'zod'

export const LoginBody = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
}).strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const RegisterBody = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
}).strict().superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
})
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>