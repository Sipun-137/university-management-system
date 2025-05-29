/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";


export const AddSection = async (formdata: any) => {
    try {
        const response = await axios.post(`${base_url}/academic/section`, formdata, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch {
        return "something went wrong"
    }
}


export const getAllSections = async () => {
    try {
        const response = await axios.get(`${base_url}/academic/sections`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch {
        return "something went wrong"
    }
}

export const updateSection = async (id: number, formData: any) => {
    try {
        const response = await axios.put(`${base_url}/academic/section/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch (e: any) {
        console.log(e);
        return "something went wrong"
    }
}


export const deleteSection = async (id: number) => {
    try {
        const response = await axios.delete(`${base_url}/academic/section/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch (e: any) {
        console.log(e);
        return "something went wrong"
    }
}