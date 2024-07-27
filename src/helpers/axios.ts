import axios from "axios";
import Router from "next/router";

const BASE_URL = "";
export const apiClient = axios.create({
    baseURL: BASE_URL,
    //timeout: 1000000,
    
});


apiClient.interceptors.request.use(
  (apiConfig) => {
    const token = localStorage.getItem("accessToken");
    apiConfig.headers["Accept-Language"] =
      localStorage.getItem("language") ||
      "tr";
    if (token) {
      apiConfig.headers.Authorization = `Bearer ${token}`;
      apiConfig.headers["Content-Encoding"] = "gzip, deflate, br";
    }
    return apiConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            //localStorage.removeItem('accessToken');
            //localStorage.removeItem('user');
            //Router.push('/login');
        }

        return Promise.reject(error);
    }
);

// Enable CORS
apiClient.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
apiClient.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin", "X-Requested-With", "Accept", "Authorization", "X-Auth-Token";
apiClient.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";


export const axiosInstance = apiClient;
