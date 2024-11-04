import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
export interface IStoryCardProps {
    image: string
    name: string
    avatar: string
    isSeen: boolean
}

const StoryCard = ({ image, name, avatar, isSeen }: IStoryCardProps) => {
    return (
        <div className=' shadow rounded-lg w-[112px] h-[200px] relative overflow-hidden'>
            <Image src={image} width={112} height={200} alt="story" className='w-full h-full object-cover' />
            <div className={cn("absolute top-4 left-4 p-1  rounded-full ", {
                "bg-blue-500": isSeen,
                "bg-gray-500": !isSeen
            })}>
                <Image src={avatar} width={40} height={40} alt="story" className='rounded-full size-[40px]' />
            </div>
            <div className="absolute bottom-4 left-4">
                <p className='text-white text-sm font-medium'>{name}</p>
            </div>

        </div>
    )
}

export default StoryCard