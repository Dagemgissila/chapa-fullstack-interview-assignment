import axios from "axios";
const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
