import axiosConfig from "../axiosConfig";

export const productEndPoint = "/product";

const ProductAPI = {
  add: async (formData) => {
    try {
      const response = await axiosConfig.post(`${productEndPoint}`, formData);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
};

export default ProductAPI;
