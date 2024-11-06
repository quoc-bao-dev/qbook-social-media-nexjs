import httpClient from "@/lib/http";

export const friendApiRequest = {
    addFriend: (targetId: string) => httpClient.post('friend/send-request', { targetId }),
    acceptFriend: (targetId: string) => httpClient.post('friend/accept-request', { targetId }),
    rejectFriend: (targetId: string) => httpClient.post('friend/reject-request', { targetId }),
    getFriendList: () => httpClient.get('friend/list'),

    follow: (targetId: string) => httpClient.post('friend/follow', { targetId }),
    unfollow: (targetId: string) => httpClient.post('friend/unfollow', { targetId }),
}