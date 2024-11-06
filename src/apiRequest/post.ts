import httpClient from "@/lib/http";
import { CreatePostBodyType } from "@/schemaValidation/post.chema";

export const postApiRequest = {
    createPost: (body: CreatePostBodyType) => httpClient.post('/post', body)
}