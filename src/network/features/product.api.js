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
  getOne: async (productId) => {
    try {
      const response = await axiosConfig.get(`${productEndPoint}/${productId}`);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  getAll: async (url) => {
    try {
      const response = await axiosConfig.get(url);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  update: async ({ productId, formData }) => {
    try {
      const response = await axiosConfig.put(
        `${productEndPoint}/${productId}`,
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
  delete: async (productId) => {
    try {
      const response = await axiosConfig.delete(
        `${productEndPoint}/${productId}`
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

export default ProductAPI;
