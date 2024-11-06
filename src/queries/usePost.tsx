import { postApiRequest } from "@/apiRequest/post"
import { queryClient } from "@/components/AppProvider"
import { CreatePostBodyType } from "@/schemaValidation/post.chema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostMutation = () => {
    return useMutation({
        mutationFn: (body: CreatePostBodyType) => postApiRequest.createPost(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export const usePostQuery = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => postApiRequest.getPosts()
    })
}

export const usePostQueryById = (userId: string) => {
    return useQuery({
        queryKey: ['posts', userId],
        queryFn: () => postApiRequest.getPostOfUser(userId)
    })
}

export const useLikePostMution = () => {
    return useMutation({
        mutationFn: (postId: string) => postApiRequest.likePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}