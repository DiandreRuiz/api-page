import { singleAPICall } from "./apiClient.js";
import { errorDisplay } from "./uiUtils.js";

const TMDB_ENDPOINT = "https://api.themoviedb.org/3/configuration";

// Load in API creds
const getAPIKey = async () => {
    const tmdbJSON = await fetch("../config.json");
    const data = await tmdbJSON.json();
    return data.TMDB_API_KEY;
};

// Function that returns result from api call
export const getTMDBResponse = async () => {
    const apiKey = await getAPIKey();
    const response = await singleAPICall(TMDB_ENDPOINT, {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
    });
};

// Function that sets up event handler for the button and is exported
