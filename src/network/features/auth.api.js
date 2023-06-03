const { default: axiosConfig } = require("../axiosConfig");

const authEndPoint = "/auth";

const Auth = {
  login: async (payload) => {
    console.log(payload);
    try {
      const response = await axiosConfig.post(`${authEndPoint}/login`, {
        ...payload,
      });
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  register: async (payload) => {
    try {
      const response = await axiosConfig.post(`${authEndPoint}/register`, {
        ...payload,
      });
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
};

export default Auth;
