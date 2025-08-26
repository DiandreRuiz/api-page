// Shared API client for making HTTP requests
export const singleAPICall = async (endpointURL) => {
    const response = await fetch(endpointURL);
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    return response;
}; 