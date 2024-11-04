import httpClient, { HttpResponse } from "@/lib/http";
import { LoginBodyType, RegisterBodyType } from "@/schemaValidation/auth.schema";

const authApiRequest = {
    login: (body: LoginBodyType) => httpClient.post('api/auth/login', body, { baseURL: '' }),
    SLogin: (body: LoginBodyType) => httpClient.post<HttpResponse>('/auth/login', body),
    register: (body: RegisterBodyType) => httpClient.post('api/auth/register', body, { baseURL: '' }),
    SRegister: (body: RegisterBodyType) => httpClient.post<HttpResponse>('/auth/register', body),
}

export default authApiRequest