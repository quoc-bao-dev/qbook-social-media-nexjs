import config from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';

export type HttpResponse = {
    data: any;
    status: number;
    message: string;
}
// Tạo một instance Axios
const httpClient = axios.create({
    baseURL: config.NEXT_PUBLIC_API_URL, // Đặt URL API chính
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true
});

// Interceptor để xử lý request
httpClient.interceptors.request.use(
    (config) => {
        // Thêm token vào header nếu có
        if (typeof window !== 'undefined') {
            const token = Cookies.get('access_token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để xử lý response
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Xử lý lỗi chung tại đây
        return Promise.reject(error);
    }
);

export default httpClient;