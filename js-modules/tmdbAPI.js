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
export const getNowPlayingResults = async () => {
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

    // Extract movie ID's and return
    const nowPlayingMovieIDs = [];
    nowPlayingResults.forEach((result) => {
        const adultResultCount = 0;
        if (!result.adult) {
            nowPlayingResults.push(result.id);
        } else {
            adultResultCount++;
        }
        console.log(`Filtered ${adultResultCount} results for adult material`);
    });

    return nowPlayingMovieIDs;
};

// Function that sets up event handler for the button and is exported
export const getNowPlayingMovieNames = async () => {
    const nowPlayingResults = await getNowPlayingResults();

    // Look up movie ID's
    const movieNames = [];
    nowPlayingResults.forEach((result) => {
        const adultResultCount = 0;
        if (!result.adult) {
            movieNames.push(result.id);
        } else {
            adultResultCount++;
        }
        console.log(`Filtered ${adultResultCount} results for adult material`);
    });

    console.log(movieNames);
};
