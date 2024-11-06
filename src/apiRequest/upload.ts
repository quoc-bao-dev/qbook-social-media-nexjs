import httpClient from "@/lib/http";

export const uploadApiRequest = {
    upload: (body: FormData) => httpClient.post('/upload', body, { headers: { 'Content-Type': 'multipart/form-data' } })
}