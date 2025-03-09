import axios from "axios";

const axiosInstance = axios.create({
    // TODO: READ FROM .ENV
    baseURL: "https://api.laklakbox.ir/api",
    timeout: 5000,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
