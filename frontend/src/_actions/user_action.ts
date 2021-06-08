import axios from 'axios'
import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER
} from './types';
import { server } from '../api/address';

// 네이버 로그인의 경우 빈 객체 전달
interface iLoginRequest {
    email?: string,
    name?: string,
    image?: string
};

export const loginUser = async (tokenId: string, body: iLoginRequest) => {
    const response = await axios.post(`${server}/api/user/login`, body, {
        headers: {
            authorization: tokenId
        }
    });

    return ({
        type: LOGIN_USER,
        payload: response.data
    });
}

export const logoutUser = async (tokenId: string) => {
    const response = await axios.get(`${server}/api/user/logout`, {
        headers: {
            authorization: tokenId
        }
    });

    return ({
        type: LOGOUT_USER,
        payload: response.data
    });
}

export const auth = async (tokenId: string) => {
    const response = await axios.get(`${server}/api/user/auth`, {
        headers: {
            authorization: tokenId
        }
    });

    return ({
        type: AUTH_USER,
        payload: response.data
    });
}