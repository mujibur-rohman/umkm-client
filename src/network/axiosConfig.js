const { default: axios } = require("axios");

const axiosConfig = axios.create({
  baseURL: process.env.API_BASEURL,
});

export default axiosConfig;
