import type { Grievance } from "@/types/grievance"
import { base_url } from "@/utils"
import axios from "axios"
import Cookies from "js-cookie"

const API_URL = "/api/grievances"

export async function getGrievances() {
  try {
    const response = await axios.get(`${base_url}${API_URL}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }

}


export async function GetStats() {
  try {
    const response = await axios.get(`${base_url}${API_URL}/stats`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getGrievanceById(id: number) {
  try {

    const response = await axios.get(`${base_url}${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }

}

export async function createGrievance(
  grievance: Omit<Grievance, "id" | "status" | "submittedAt" | "updatedAt">,
) {
  try {

    const response = await axios.post(`${base_url}${API_URL}`, grievance, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }


}

export async function updateGrievance(id: number, updates: Partial<Grievance>) {
  try{
    const response=await axios.put(`${base_url}${API_URL}/${id}/respond`,updates,{
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  }catch(e){
    console.log(e);
  }
}

export async function deleteGrievance(id: number): Promise<void> {
  try{
    const response=await axios.delete(`${base_url}${API_URL}/${id}`,{
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  }catch(e){
    console.log(e);
  }
}

export async function getMyGrievances() {
  try{
    const response=await axios.get(`${base_url}${API_URL}/my`,{
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    return response.data;
  }catch(e){
    console.log(e);
  }

}
