/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";


export const AddBatch = async (formdata: any) => {
    try {
        const response = await axios.post(`${base_url}/academic/batch`, { courseId: formdata.courseId, startYear: formdata.startYear, endYear: formdata.endYear }, {
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


export const getAllBatches = async () => {
    try {
        const response = await axios.get(`${base_url}/academic/batches`, {
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

export const updateBatch = async (id: number, formData: any) => {
    try {
        const response = await axios.put(`${base_url}/academic/batch/${id}`, formData, {
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


export const deleteBatch = async (id: number) => {
    try {
        const response = await axios.delete(`${base_url}/academic/batch/${id}`, {
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