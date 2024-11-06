export type PostResponseType = {
    _id: string
    userId: UserId
    content: string
    media: string[]
    visibility: string
    hashtags: string[]
    likes: UserId[]
    saves: UserId[]
    createdAt: Date
    updatedAt: Date
}

type UserId = {
    _id: string
    username: string
    avatar: string
}

