import { singleAPICall } from "./apiClient.js";
import { errorDisplay } from "./uiUtils.js";

const TMDB_NOWPLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing";
const TMDB_MOVIELOOKUP_ENDPOINT = 
const apiKey = await getAPIKey();

// Load in API creds
const getAPIKey = async () => {
    const tmdbJSON = await fetch("../config.json");
    const data = await tmdbJSON.json();
    return data.TMDB_API_KEY;
};

// Function that returns the names of movies currently in theatres
export const getNowPlayingResults = async () => {
    // Get movie ID's
    const response = await singleAPICall(TMDB_NOWPLAYING_ENDPOINT, {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
    });
    const data = await response.json();
    const nowPlayingResults = data.results;

    if (!nowPlayingResults.length > 0) {
        throw new Error("Could not retrieve results from TMDB API");
    }

    // Extract movie titles, filter adult movies and return
    const nowPlayingMovieTitles = [];
    nowPlayingResults.forEach((result) => {
        const adultResultCount = 0;
        if (!result.adult) {
            nowPlayingMovieTitles.push(result.original_title);
        } else {
            adultResultCount++;
        }
        console.log(`Filtered ${adultResultCount} results for adult material`);
    });

    return nowPlayingMovieTitles;
};

// Function that sets up event handler for the button and is exported
export const getNowPlayingMovieNames = async () => {
    // Get movie IDs
    const nowPlayingMovieIDs = await getNowPlayingResults();

    const nowPlayingMovieNames = [];
    nowPlayingMovieIDs.forEach(async (movieID) => {
        const response = await singleAPICall(TMDB_NOWPLAYING_ENDPOINT, {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
        });
    });
    console.log(movieNames);
};
