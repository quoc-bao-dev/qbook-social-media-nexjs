import httpClient from "@/lib/http";

const accountApiRequest = {

    getAccount: async (userId: string) => httpClient.get(`/users/${userId}`),
}

export default accountApiRequest