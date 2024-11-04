import { Ellipsis, Heart, MessageCircle, Share2, X } from "lucide-react"
import Image from "next/image"

interface IPostProps {
    name: string
    avatar: string
    medeia: string[] | string
    content: string
    hagtag: string | string[]
}
const Post = ({ name, avatar, medeia, content, hagtag }: IPostProps) => {
    return (
        <div className="p-4 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image src={avatar} alt="User avatar" width={48} height={48} className="rounded-full object-cover overflow-hidden size-[48px]" />
                    <div className="flex flex-col ">
                        <p className="font-medium">{name}</p>
                        <p className="text-muted-foreground">8h ago</p>
                    </div>

                </div>
                <div className="flex gap-3 items-center">
                    <Ellipsis />
                    <X />
                </div>
            </div>
            <div className="mt-3">
                <p className="text-popover-foreground">
                    {content}
                </p>
            </div>
            <div className="mt-3">
                <p className="text-popover-foreground">
                    {Array.isArray(hagtag) && hagtag.map((hagtag, index) => (<span key={index} className="text-primary">{hagtag}</span>))}
                </p>
            </div>
            <div className="mt-3">
                {!Array.isArray(medeia) && <Image src={medeia} alt="User avatar" width={48} height={48} className="w-full h-full object-cover overflow-hidden max-h-[448px] rounded-lg" />}
                {Array.isArray(medeia) && <div className="flex gap-2">{
                    medeia.map((medeia, index) => (
                        <Image src={medeia} alt="User avatar" width={48} height={48} key={index} className="w-full h-full object-cover overflow-hidden rounded-lg" />
                    ))
                }</div>}
            </div>

            <div className="mt-2 py-3 flex justify-between ">
                <div className="flex gap-3 items-center">
                    <Heart />
                    <p className="text-popover-foreground"> You and 300 others</p>
                </div>
                <p className="text-popover-foreground"> 100 comments</p>
            </div>
            <div className="mt-2 py-2 grid grid-cols-3   px-4 border-t border-b border-muted">

                <button className="flex gap-3 items-center justify-center w-full py-2 transition duration-200 rounded-lg hover:bg-muted ">
                    <Heart /> <p>Like</p>
                </button>
                <button className="flex gap-3 items-center justify-center w-full py-2 transition duration-200 rounded-lg hover:bg-muted ">
                    <MessageCircle /> <p>Comment</p>
                </button>
                <button className="flex gap-3 items-center justify-center w-full transition duration-200 rounded-lg hover:bg-muted ">
                    <Share2 /> <p>Share</p>
                </button>
            </div>
        </div>
    )
}

export default Post