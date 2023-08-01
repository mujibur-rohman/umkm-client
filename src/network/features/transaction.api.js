import axiosConfig from "../axiosConfig";

export const transactionEndPoint = "/transaction";

const TransactionAPI = {
  add: async (payload) => {
    try {
      const response = await axiosConfig.post(transactionEndPoint, payload);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  getByUser: async (userId) => {
    try {
      const response = await axiosConfig.get(
        transactionEndPoint + "?userId=" + userId
      );
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  getByStore: async (storeId) => {
    try {
      const response = await axiosConfig.get(
        transactionEndPoint + "?storeId=" + storeId
      );
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  },
  updateStatus: async ({ id, statusPayment, statusDelivery }) => {
    try {
      const response = await axiosConfig.put(transactionEndPoint + "/" + id, {
        statusPayment,
        statusDelivery,
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

export default TransactionAPI;
