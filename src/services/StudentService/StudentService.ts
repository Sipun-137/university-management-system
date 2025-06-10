/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddStudent=async(student:any)=>{
    try {
        const response=await axios.post(`${base_url}/student`,student,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const getAllStudents=async ()=>{
    try {
        const response=await axios.get(`${base_url}/student/get-all`,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}



export const GetStudentById=async (id:number)=>{
    try {
        const response=await axios.get(`${base_url}/student/${id}`,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}


export const AssignSection=async (id:number,formData:{sectionId:number,semesterId:number})=>{
    try {
        const response=await axios.put(`${base_url}/student/${id}/assign-section`,formData,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getStudentsBySection=async (sectionId:number,semesterId:number)=>{
     try {
        const response=await axios.get(`${base_url}/student/${semesterId}/${sectionId}`,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}


export const getMyProfile=async()=>{
    try {
        const response=await axios.get(`${base_url}/student/my-profile`,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    } catch (e) {
         if (e instanceof Error) {
            return { success: false, message: e.message };
        }
        return { success: false, message: 'An unknown error occurred' };
    
    }
}


export const updateStudentData=async(id:string,formData:any)=>{
    try {
        const response=await axios.put(`${base_url}/student/${id}`,formData,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch (e) {
       if (e instanceof Error) {
            return { success: false, message: e.message };
        }
        return { success: false, message: 'An unknown error occurred' };
    }
}