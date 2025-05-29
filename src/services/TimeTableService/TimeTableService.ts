/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";







export const GetAllTimeTable = async () => {
    try {
        const response = await axios.get(`http://localhost:8085/api/timetable/admin/all`, {
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


export const getFacultytimeTableByDay = async (day:string) =>{
    try {
        const response = await axios.get(`http://localhost:8085/api/timetable/faculty/${day}`, {
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



export const getStudentTimeTable=async ()=>{
    try {
        const response = await axios.get(`http://localhost:8085/api/timetable/my-timetable`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (e:any) {
        console.log(e);

    }
}

