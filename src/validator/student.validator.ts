import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'


const studentZodSchema = z.object({
    full_name: z.string("Student name is required").min(5,'Minimum character is 5')
})


export type Student = z.infer<typeof studentZodSchema>