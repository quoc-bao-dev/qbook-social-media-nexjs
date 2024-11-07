'use client'

import { getCurrentUserId, imgUrl } from '@/lib/utils';
import { useLikePostMution } from '@/queries/usePost';
import { PostResponseType } from '@/type/post';
import { formatDistanceToNow } from "date-fns";
import { Ellipsis, Heart, MessageCircle, Share2, X } from 'lucide-react';
import Image from 'next/image';

type TPostProps = Pick<PostResponseType, '_id' | 'content' | 'media' | 'hashtags' | 'createdAt' | 'likes' | 'saves' | 'userId'>
const Post = ({ _id, userId, media, content, hashtags, createdAt, likes }: TPostProps) => {

    const likedMutation = useLikePostMution()

    const currentUserId = getCurrentUserId()

    const isLiked = likes.map((like) => like._id).includes(currentUserId)

    const handleLike = () => {
        likedMutation.mutate(_id)
    }



    return (
        <div className="p-4 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image
                        src={imgUrl(userId.avatar)}
                        alt="User avatar"
                        width={500}
                        height={500}
                        className="rounded-full object-cover overflow-hidden size-[48px]"
                    />
                    <div className="flex flex-col ">
                        <p className="font-medium">{userId.username}</p>
                        <p className="text-muted-foreground">{formatDistanceToNow(createdAt)}</p>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="p-2 rounded-full hover:bg-muted">
                        <Ellipsis />
                    </div>
                    <div className="p-2 rounded-full hover:bg-muted">
                        <X />
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <p className="text-popover-foreground">{content}</p>
            </div>
            <div className="mt-3">
                <p className="text-popover-foreground">
                    {Array.isArray(hashtags) &&
                        hashtags.map((hashtags, index) => (
                            <span key={index} className="text-primary">
                                {hashtags}
                            </span>
                        ))}
                </p>
            </div>
            <div className="mt-3">
                {media && !Array.isArray(media) && (
                    <Image
                        src={imgUrl(media)}
                        alt="User avatar"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover overflow-hidden max-h-[448px] rounded-lg"
                    />
                )}
                {media && Array.isArray(media) && (
                    <div className="flex gap-2">
                        {media.map((media, index) => (
                            <Image
                                src={imgUrl(media)}
                                alt="User avatar"
                                width={500}
                                height={500}
                                key={index}
                                className="w-full h-full object-cover overflow-hidden rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-2 py-3 flex justify-between ">
                <div className="flex gap-3 items-center">
                    <Heart />
                    <p className="text-popover-foreground">
                        {likes.length} like
                    </p>
                </div>
                <p className="text-popover-foreground"> 100 comments</p>
            </div>
            <div className="mt-2 py-2 grid grid-cols-3   px-4 border-t border-b border-muted">
                <button onClick={handleLike} className="flex gap-3 items-center justify-center w-full py-2 transition duration-200 rounded-lg hover:bg-muted ">
                    {isLiked ? <Heart className="text-red-500" /> : <Heart />} <p>Like</p>
                </button>
                <button className="flex gap-3 items-center justify-center w-full py-2 transition duration-200 rounded-lg hover:bg-muted ">
                    <MessageCircle /> <p>Comment</p>
                </button>
                <button className="flex gap-3 items-center justify-center w-full transition duration-200 rounded-lg hover:bg-muted ">
                    <Share2 /> <p>Share</p>
                </button>
            </div>
        </div>
    );
};

export default Post;
