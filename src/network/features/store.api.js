import axiosConfig from "../axiosConfig";

const storeEndPoint = "/store";

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
};

export default StoreAPI;
