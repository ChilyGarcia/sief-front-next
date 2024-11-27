import { Credentials } from "@/interfaces/credentials.interface";
import Cookies from "js-cookie";

const BACKEND_URL = "http://localhost:8080/api/auth"; // https://clownfish-app-8pq82.ondigitalocean.app/api/auth    http://127.0.0.1:8000/api/auth

const fetchWithInterceptor = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    console.error("Unauthorized! Redirecting to login...");

    Cookies.remove("token");

    window.location.href = "/";
  }

  return response;
};

export const authenticationService = {
  login: async (credentials: Credentials) => {
    try {
      const response = await fetchWithInterceptor(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);
      return false;
    }
  },
  logOut: async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetchWithInterceptor(`${BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);
      return false;
    }
  },
  userDetails: async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found! Redirecting to login...");

      return false;
    }

    try {
      const response = await fetchWithInterceptor(`${BACKEND_URL}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error getting user details:", (error as Error).message);
      return false;
    }
  },
};
