import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.5:8888",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
