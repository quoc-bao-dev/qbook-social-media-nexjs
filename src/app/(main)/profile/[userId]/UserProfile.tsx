"use client"

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn, getCurrentUserId, imgUrl } from '@/lib/utils'
import { useAccountQueryById } from '@/queries/useAccount'
import { useAddFriendRequest, useFollow, useUnfollow } from '@/queries/useFriend'
import { Rss, UserRoundPlus } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
];
const UserProfile = () => {
    const { userId } = useParams() as { userId: string };

    const { toast } = useToast()

    const friendMutaton = useAddFriendRequest(userId)
    const followMutation = useFollow(userId)
    const unfollowMutation = useUnfollow(userId)

    const { data } = useAccountQueryById(userId)

    const user = data?.data.data

    const handleAddFriend = async () => {
        const result = await friendMutaton.mutateAsync()
        toast({
            description: result.data.message
        })
    }

    const handleFollow = async () => {
        const result = await followMutation.mutateAsync()
        toast({
            description: result.data.message
        })
    }

    const handleUnFollow = async () => {
        const result = await unfollowMutation.mutateAsync()
        toast({
            description: result.data.message
        })
    }

    const currentUserId = getCurrentUserId()

    const isFollowed = user?.followers.map((follower) => follower._id).includes(currentUserId)
    return (
        <>
            <div className="h-[348px] w-full">
                <Image
                    src={imgUrl(user?.avatar as string)}
                    alt="user profile"
                    className="w-full h-full object-cover rounded-lg"
                    width={500}
                    height={348}
                />
            </div>
            <div className="mt-8 flex justify-between">
                <div className="flex gap-4">
                    <div className="w-[168px] h-[168px] rounded-full overflow-hidden">
                        <Image
                            src={imgUrl(user?.avatar as string)}
                            alt="user profile"
                            className="w-full h-full object-cover"
                            width={168}
                            height={168}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-simibold">{user?.username}</h1>
                        <p className="mt-1 text-accent-foreground">
                            {user?.followers.length} followers . {user?.following.length} following
                        </p>
                        <div className="flex gap-3 mt-4 ml-6">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="w-[40px] h-[40px] rounded-full overflow-hidden -ml-6 p-1 bg-muted"
                                >
                                    <Image
                                        src={avatar}
                                        alt="user profile"
                                        className="w-full h-full object-cover rounded-full"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className=" flex gap-3">
                    <Button onClick={handleAddFriend} className="w-full" ><UserRoundPlus /> Add Friend</Button>
                    <Button onClick={isFollowed ? handleUnFollow : handleFollow} variant={isFollowed ? "secondary" : "default"} className={cn("w-full")}><Rss /> {isFollowed ? "Unfollow" : "Follow"}</Button>
                </div>
            </div>

            <div className="mt-4">
                <p className="mt-8 font-medium text-muted-foreground">
                    {user?.bio}
                </p>
            </div>
        </>
    )
}

export default UserProfile