
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie"

export const Login = async (formData: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${base_url}/login`, formData)
        return response.data
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { success: false, message: e.message };
        }
        return { success: false, message: 'An unknown error occurred' };
    }
}




export const Changepassword = async (formData: { oldPassword: string, newPassword: string }) => {
    try {
        const response = await axios.post(`${base_url}/change-password`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { success: false, message: e.message };
        }
        return { success: false, message: 'An unknown error occurred' };
    }
}