import httpClient, { HttpResponse } from "@/lib/http";
import { CreatePostBodyType } from "@/schemaValidation/post.chema";
import { PostResponseType } from "@/type/post";

export const postApiRequest = {
    getPosts: () => httpClient.get<HttpResponse<PostResponseType[]>>('/post'),
    getPostOfUser: (userId: string) => httpClient.get<HttpResponse<PostResponseType[]>>(`/post/user/${userId}`),
    createPost: (body: CreatePostBodyType) => httpClient.post('/post', body),
    likePost: (postId: string) => httpClient.post(`/post/${postId}/like`),
}