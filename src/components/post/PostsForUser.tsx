'use client'

import React from 'react'
import Post from './Post'
import { usePostQueryById } from '@/queries/usePost'
import { useParams } from 'next/navigation'

const PostsForUser = () => {

    const { userId } = useParams()

    const postQuery = usePostQueryById(userId as string)
    const posts = postQuery.data?.data.data || []
    console.log(postQuery.data?.data.data);



    if (postQuery.isLoading) return <p>Loading...</p>
    if (postQuery.isError) return <p>Error</p>

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <Post key={post._id} {...post} />)}
        </div>
    )
}

export default PostsForUser