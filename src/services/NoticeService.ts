

import type { Notice } from "@/types/notice"
import { base_url } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";

// Dummy implementations for demonstration; replace with real API calls.

export async function getNotices(): Promise<Notice[]> {
    try {
        const response = await axios.get(`${base_url}/api/notice/all`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (e) {
        console.log(e);
    }
    // Replace with actual fetch logic
    return []
}

export async function createNotice(notice: Partial<Notice>) {
    // Replace with actual create logic
    try {
        const response = await axios.post(`${base_url}/api/notice`, notice, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteNotice(id: number): Promise<void> {
    // Replace with actual delete logic
    try {
        const response = await axios.delete(`${base_url}/api/notice/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getNoticeById(id: number) {
    try {
        const response =await axios.get(`${base_url}/api/notice/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
       return response.data;       
    } catch (e) {
        console.log(e);
    }
}


export async function updateNotice(id: number, notice: Omit<Notice, "id">) {
    try {
        const response = await axios.put(`${base_url}/api/notice/${id}`, notice, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = response.data;
        return data;
    } catch (e) {
        console.log(e);
    }

}