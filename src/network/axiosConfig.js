const { default: axios } = require("axios");

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default axiosConfig;
