import { API_URL } from '@/constants';
import axios from 'axios'

export async function register(data: any) {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function login(data: any) {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createPayment(companyId: string, data: any) {
  try {
    const response = await axios.post(`${API_URL}/payment/${companyId}`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createWorker(data: any) {
  try {
    const response = await axios.post(`${API_URL}/workers`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createMaterial(data: any) {
  try {
    const response = await axios.post(`${API_URL}/materials`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createProject(data: any) {
  try {
    const response = await axios.post(`${API_URL}/projects`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function updateProject(projectId: string, data: any) {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}
