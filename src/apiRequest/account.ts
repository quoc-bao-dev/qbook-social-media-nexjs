import httpClient, { HttpResponse } from "@/lib/http";
import { AccountResponseType } from "@/type/account";

const accountApiRequest = {
    getMe: () => httpClient.get<HttpResponse<AccountResponseType>>(`/auth/me`),
    getAccount: (userId: string) => httpClient.get<HttpResponse<AccountResponseType>>(`/user/${userId}`),
}

export default accountApiRequest