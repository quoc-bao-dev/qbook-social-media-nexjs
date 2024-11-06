import { postApiRequest } from "@/apiRequest/post"
import { CreatePostBodyType } from "@/schemaValidation/post.chema"
import { useMutation } from "@tanstack/react-query"

export const usePostMutation = () => {
    return useMutation({
        mutationFn: (body: CreatePostBodyType) => postApiRequest.createPost(body)
    })
}