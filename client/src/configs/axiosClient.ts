import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("persist:auth")
      ? JSON.parse(localStorage.getItem("persist:auth") || "").token.slice(
          1,
          -1
        )
      : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("persist:auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosConfig;
