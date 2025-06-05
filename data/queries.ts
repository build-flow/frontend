import { API_URL } from "@/constants";
import { getToken } from "@/lib/utils";
import axios from "axios";

export async function getCompany() {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function logout() {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function getCompanyWorkers(companyId: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/workers/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getWorker(idNumber: number) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/workers/${idNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMaterial(materialId: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/materials/${materialId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function getCompanyProjects(companyId: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/companies/${companyId}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(error)
  }
}

export async function getProjectMaterials(projectId: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/materials/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function getProject(projectId: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}


export async function deleteProject(projectId: string) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function detachWorker(projectId: string, idNumber: number) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/projects/${projectId}/workers/${idNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function detachMaterial(projectId: string, materialId: string) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/projects/${projectId}/workers/${materialId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function deleteWorker(idNumber: number) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/workers/${idNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export async function deleteMaterial(materialId: string) {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/materials/${materialId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}
