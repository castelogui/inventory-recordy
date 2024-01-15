import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://backend-rh-brasilsuperatacado.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
