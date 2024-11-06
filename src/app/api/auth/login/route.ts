import authApiRequest from "@/apiRequest/auth";
import { LoginBodyType } from "@/schemaValidation/auth.schema";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const res = (await request.json()) as LoginBodyType

    const cookieStore = await cookies()

    const data = await authApiRequest.SLogin(res)

    const { data: payload } = data.data

    const { accessToken, refreshToken } = payload

    const decodeAccessToken = jwt.decode(accessToken) as { exp: number }

    const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number }

    cookieStore.set('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        expires: new Date(decodeAccessToken.exp * 1000)
    })

    cookieStore.set('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        expires: new Date(decodeRefreshToken.exp * 1000)
    })

    const response = {
        status: data.data.status,
        message: data.data.message,
        payload
    }

    return Response.json(response)

}