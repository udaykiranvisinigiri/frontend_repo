import apiClient from "./apiService";

export const chatAPI = async (payload) => {
    return new Promise(async (resolve) => {
        try {
            const response = await apiClient.post(`/chat`, payload);
            if (response.status === 200) {
                resolve({ status: true, data: response.data });
            }
            else {
                new Error("Error in chatAPI");
            }
        }
        catch (err) {
            resolve({ status: false, data: err, message: err.message });
        }
    });
}