import apiClient from "./apiService";

export const TicketAPI = async (sessionId) => {
    return new Promise(async (resolve) => {
        try {
            const response = await apiClient.get(`/tickets?sessionId=${sessionId}`);
            if (response.status === 200) {
                resolve({ status: true, data: response.data });
            }
            else {
                new Error("Error in TicketAPI");
            }
        }
        catch (err) {
            resolve({ status: false, data: err, message: err.message });
        }
    });
}

export const TicketMetricsAPI = async (sessionId) => {
    return new Promise(async (resolve) => {
        try {
            const response = await apiClient.get(`/metrics/summary`);
            if (response.status === 200) {
                resolve({ status: true, data: response.data });
            }
            else {
                new Error("Error in TicketAPI");
            }
        }
        catch (err) {
            resolve({ status: false, data: err, message: err.message });
        }
    });
}