export const API_URL = process.env.API_URL || 'http://localhost:8000'

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
}
