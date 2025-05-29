/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";


export const getFacultyTodayAttendanceSchedule = async () => {
    try {
        const response = await axios.get(`http://localhost:8085/api/attendance/faculty/today`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (e: any) {
        console.log(e);
        return [];
    }
}



export const TakeAttendance = async (formData: any) => {
    try {
        const response = await axios.post(`${base_url}/api/attendance/mark`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data;
    } catch (e: any) {
        console.log(e);
        return [];
    }
}