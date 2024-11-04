import authApiRequest from "@/apiRequest/auth";
import { RegisterBodyType } from "@/schemaValidation/auth.schema";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const res = (await request.json()) as RegisterBodyType
    const cookieStore = await cookies()

    const data = await authApiRequest.SRegister(res)

    const { data: payload } = data.data

    const { accessToken, refreshToken } = payload

    const decodeAccessToken = jwt.decode(accessToken) as { exp: number }

    const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number }

    cookieStore.set('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: new Date(decodeAccessToken.exp * 1000)
    })

    cookieStore.set('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: new Date(decodeRefreshToken.exp * 1000)
    })

    return Response.json(res)
}