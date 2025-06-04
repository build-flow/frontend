import { API_URL, getToken } from '@/constants';
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
    const token = getToken();
    const response = await axios.post(`${API_URL}/payment/${companyId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createWorker(data: any) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/workers`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createMaterial(data: any) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/materials`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function createProject(data: any) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/projects`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function updateProject(projectId: string, data: any) {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/projects/${projectId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function attachWorker(projectId: string, data: any) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/projects/${projectId}/workers`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function attachMaterial(projectId: string, data: any) {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/projects/${projectId}/materials`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function updateWorker(idNumber: string, data: any) {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/workers/update/${idNumber}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function updateMaterial(materialId: string, data: any) {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/materials/update/${materialId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}
