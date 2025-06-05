import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    return localStorage.setItem("access_token", token);
  }
  return "";
}

export function getCompanyId() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("companyId") || "";
  }
  return "";
}
