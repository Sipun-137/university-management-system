/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import Cookies from "js-cookie";
import axios from "axios";



export const AddBranch=async(formData:any)=>{
    try {
        const response=await axios.post(`${base_url}/academic/branch`,formData,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response);
    } catch (e:any) {
        console.log(e);
        return ;
    }
}

export const GetAllBranch=async()=>{
    try {
        const response=await axios.get(`${base_url}/academic/branches`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response);
        return response.data;
    } catch (e:any) {
        console.log(e);
        return ;
    }
}


export const updateBranch=async(id:number,formData:any)=>{
    try {
        const response=await axios.put(`${base_url}/academic/branch/${id}`,formData,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e:any) {
        console.log(e);
        return ;
    }
}

export const DeleteBranch=async (id:number)=>{
     try {
        const response=await axios.delete(`${base_url}/academic/branch/${id}`,{
            headers:{
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response)
        return response.data;
     } catch (e:any) {
        console.log(e);
        return;
     }
}