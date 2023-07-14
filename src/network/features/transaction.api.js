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
};

export default TransactionAPI;
