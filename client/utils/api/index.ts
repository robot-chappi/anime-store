import axios from "axios";
import { LoginUserDto } from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

export const UserApi = {
    async register(formData: any) {
        const {data} = await instance.post('auth/register', formData)
        return data;
    },
    async login(dto: LoginUserDto) {
        const {data} = await instance.post('auth/login', dto)
        return data;
    }
}