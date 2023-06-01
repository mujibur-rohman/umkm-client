const { default: axiosConfig } = require("../axiosConfig");

const authEndPoint = "/auth";

const Auth = {
  login: async (payload) => {
    const response = await axiosConfig.post(`${authEndPoint}`, { ...payload });
    return response.data;
  },
  register: async (payload) => {
    const response = await axiosConfig.post(`${authEndPoint}/register`, {
      ...payload,
    });
    return response.data;
  },
};

export default Auth;
