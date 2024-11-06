'use client'

import { usePostQuery } from '@/queries/usePost'
import Post from './Post'

const ForYou = () => {

    const postQuery = usePostQuery()
    const posts = postQuery.data?.data.data || []


    if (postQuery.isLoading) return <p>Loading...</p>
    if (postQuery.isError) return <p>Error</p>

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <Post key={post._id} {...post} />)}
        </div>
    )
}

export default ForYou