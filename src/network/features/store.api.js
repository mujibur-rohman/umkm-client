import axiosConfig from "../axiosConfig";

export const storeEndPoint = "/store";

const StoreAPI = {
  add: async ({ formData, uuidUser }) => {
    try {
      const response = await axiosConfig.post(
        `${storeEndPoint}/${uuidUser}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  getOne: async (id) => {
    try {
      const response = await axiosConfig.get(`${storeEndPoint}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  update: async ({ formData, storeId }) => {
    try {
      const response = await axiosConfig.put(
        `${storeEndPoint}/${storeId}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
};

export default StoreAPI;
