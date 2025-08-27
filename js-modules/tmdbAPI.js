import { singleAPICall } from "./apiClient.js";
import { displayError } from "./uiUtils.js";
import { displayMovieList } from "./uiUtils.js";

// Load in API creds
const getAPIKey = async () => {
    const tmdbJSON = await fetch("../config.json");
    const data = await tmdbJSON.json();
    return data.TMDB_API_KEY;
};

const TMDB_NOWPLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing?region=US";

// Function that returns the names of movies currently in theatres
export const getNowPlayingMovies = async () => {
    // Get results from API
    const apiKey = await getAPIKey();
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
        console.warn(`Filtered ${adultResultCount} results for adult material`);
    });

    console.log(nowPlayingMovieTitles);

    return nowPlayingMovieTitles;
};

// Event Handlers
export const setupTMDBAPIHandlers = () => {
    const nowPlayingButton = document.querySelector("#api-4-button");
    nowPlayingButton.addEventListener("click", async () => {
        try {
            const api4Container = document.querySelector("#api4-container");
            const movieList = await getNowPlayingMovies();
            displayMovieList(movieList, api4Container);
        } catch (error) {
            console.error(`Error getting now playing movie list: ${error}`);
            displayError("#api4-container", error.message);
        }
    });
};
