import accountApiRequest from "@/apiRequest/account"
import { useQuery } from "@tanstack/react-query"


export const useAccountQuery = () => {
    return useQuery({
        queryKey: ['account', 'me'],
        queryFn: accountApiRequest.getMe,
    })
}

export const useAccountQueryById = (userId: string) => {
    return useQuery({
        queryKey: ['account', userId],
        queryFn: () => accountApiRequest.getAccount(userId),
    })
}