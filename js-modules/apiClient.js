// Shared API client for making HTTP requests
export const singleAPICall = async (endpointURL, headers = {}) => {
    const response = await fetch(endpointURL, { headers: headers });
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    return response;
};
