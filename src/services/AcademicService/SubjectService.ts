/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";


export const AddSubject = async (formdata: any) => {
    try {
        const response = await axios.post(`${base_url}/academic/subject`, formdata, {
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


export const getAllSubjects = async () => {
    try {
        const response = await axios.get(`${base_url}/academic/subjects`, {
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

export const updateSubject = async (id: number, formData: any) => {
    try {
        const response = await axios.put(`${base_url}/academic/subject/${id}`, formData, {
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


export const deleteSubject = async (id: number) => {
    try {
        const response = await axios.delete(`${base_url}/academic/subject/${id}`, {
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