import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from 'jwt-decode';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const imgUrl = (url: string) => {
  return `http://localhost:3066/media/${url}`
}


export const getCurrentUserId = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken') as string;

    if (token) {
      try {
        const decodedToken: { id: string } = jwtDecode(token);
        return decodedToken.id;
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }
  return '';
}