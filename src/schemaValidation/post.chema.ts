import { z } from "zod";

export const CreatePostBody = z.object({
    content: z.string().min(1).max(1000),
    media: z.array(z.string().url()).optional(),
    hashtags: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private', 'friends']).default('public'),
})

export type CreatePostBodyType = z.TypeOf<typeof CreatePostBody>