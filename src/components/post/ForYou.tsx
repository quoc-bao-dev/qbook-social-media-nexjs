import React from 'react'
import Post from './Post'

const posts = [
    {
        name: "Nguyen Van A",
        avatar: "https://i.pravatar.cc/150?img=1",
        medeia: "https://picsum.photos/200/300",
        content: "Hello everyone! I'm Nguyen Van A",
        hagtag: ["#hello", "#world"]
    },
    {
        name: "Nguyen Van B",
        avatar: "https://i.pravatar.cc/150?img=2",
        medeia: ["https://picsum.photos/200/301", "https://picsum.photos/200/302"],
        content: "I'm Nguyen Van B",
        hagtag: ["#hello", "#world", "#react"]
    },
    {
        name: "Nguyen Van C",
        avatar: "https://i.pravatar.cc/150?img=3",
        medeia: "https://picsum.photos/200/303",
        content: "I'm Nguyen Van C",
        hagtag: ["#hello", "#world", "#nextjs"]
    },
    {
        name: "Nguyen Van D",
        avatar: "https://i.pravatar.cc/150?img=4",
        medeia: ["https://picsum.photos/200/304", "https://picsum.photos/200/305"],
        content: "I'm Nguyen Van D",
        hagtag: ["#hello", "#world", "#typescript"]
    },
]

const ForYou = () => {

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => <Post key={post.name} {...post} />)}
        </div>
    )
}

export default ForYou