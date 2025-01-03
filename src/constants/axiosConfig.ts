import axios from "axios";

const axiosInstance = axios.create({
    // TODO: READ FROM .ENV
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 5000,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
