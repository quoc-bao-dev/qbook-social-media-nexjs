import { friendApiRequest } from "@/apiRequest/friend"
import { queryClient } from "@/components/AppProvider"
import { useMutation } from "@tanstack/react-query"

export const useAddFriendRequest = (targetId: string) => {
    return useMutation({
        mutationFn: () => friendApiRequest.addFriend(targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account', targetId] })
        }
    })
}

export const useFollow = (targetId: string) => {
    return useMutation({
        mutationFn: () => friendApiRequest.follow(targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account', targetId] })
        }
    })
}

export const useUnfollow = (targetId: string) => {
    return useMutation({
        mutationFn: () => friendApiRequest.unfollow(targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account', targetId] })
        }
    })
}