/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";






export const AddSubjectAssignment = async (newAssignment: any) => {
    try {
        const response = await axios.post(`${base_url}/api/faculty/${newAssignment.facultyId}/assignments`, newAssignment, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const GetAllSubjectAssignements=async()=>{
    try {
        const response = await axios.get(`${base_url}/api/faculty/assignments`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}