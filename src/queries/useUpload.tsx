import { uploadApiRequest } from "@/apiRequest/upload"
import { useMutation } from "@tanstack/react-query"

export const useUpLoadMutation = () => {
    return useMutation({
        mutationFn: (body: FormData) => uploadApiRequest.upload(body)
    })
}