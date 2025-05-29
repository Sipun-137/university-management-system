import { base_url } from "@/utils"
import axios from "axios"
import Cookies from "js-cookie"


export const GetCourseData = async () => {
    try {
        const response = await axios.get(`${base_url}/academic/courses`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch {
        return "something went wrong"
    }
}


export const AddCourse = async (formdata: { name: string, durationInYears: number }) => {
    try {
        const response = await axios.post(`${base_url}/academic/courses`, formdata, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch {
        return "something went wrong"
    }
}


export const UpdateCourse=async (id:number,course:{ name: string, durationInYears: number })=>{
     try {
        const response = await axios.put(`${base_url}/academic/courses/${id}`, course, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch {
        return "something went wrong"
    }
}


export const DeleteCourse=async (id:number)=>{
    try {
        const response = await axios.delete(`${base_url}/academic/courses/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch {
        return "something went wrong"
    }
}