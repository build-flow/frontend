import { API_URL } from '@/constants';
import { getToken } from '@/lib/utils';
import axios from 'axios'

export async function handleRegistration(data: any) {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function login(data: any) {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
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
    throw new Error(error.response?.data?.message || 'Payment failed');
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
    throw new Error(error.response?.data?.message || 'Error creating worker');
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
    throw new Error(error.response?.data?.message || 'Error creating material');
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
    throw new Error('Error creating project!')
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
    throw new Error(error.response?.data?.message || 'Error updating project');
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
    throw new Error(error.response?.data?.message || 'Error attaching worker');
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
    throw new Error(error.response?.data?.message || 'Error attaching material');
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
    throw new Error(error.response?.data?.message || 'Error updating worker');
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
    throw new Error(error.response?.data?.message || 'Error updating material');
  }
}
