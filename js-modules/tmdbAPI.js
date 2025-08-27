import { singleAPICall } from "./apiClient.js";
import { errorDisplay } from "./uiUtils.js";

const TMDB_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing";

// Load in API creds
const getAPIKey = async () => {
    const tmdbJSON = await fetch("../config.json");
    const data = await tmdbJSON.json();
    return data.TMDB_API_KEY;
};

// Function that returns the names of movies currently in theatres
export const getTMDBResponse = async () => {
    // Get movie ID's
    const apiKey = await getAPIKey();
    const response = await singleAPICall(TMDB_ENDPOINT, {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
    });
    const data = await response.json();
    const nowPlayingResults = data.results;
    if (!nowPlayingResults.length > 0) {
        throw new Error("Could not retrieve results from TMDB API");
    }

    // Look up movie ID's
    const movieNames = [];
};

// Function that sets up event handler for the button and is exported
