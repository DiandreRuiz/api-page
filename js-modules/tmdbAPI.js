import { singleAPICall } from "./apiClient.js";
import { displayError, showSpinner, displayMovieList } from "./uiUtils.js";

// Load in API creds
const getAPIKey = async () => {
    const tmdbJSON = await fetch("../config/config.json");
    const data = await tmdbJSON.json();
    return data.TMDB_API_KEY;
};

const TMDB_NOWPLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing?region=";

// Function that returns the names of movies currently in theatres
export const getNowPlayingMovies = async (countryCode) => {
    // Ensure Input
    if (!countryCode || countryCode === "" || countryCode.length === 0) {
        throw new Error("No country code provided by user");
    }

    // Get results from API
    const apiKey = await getAPIKey();
    const response = await singleAPICall(`${TMDB_NOWPLAYING_ENDPOINT}${countryCode}`, {
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
    const nowPlayingForm = document.querySelector("#api4-form");

    nowPlayingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Preserve scroll position
        const scrollY = window.scrollY;
        try {
            // Clear currently displayed errors
            if (nowPlayingForm.querySelector(".errorUserInputHeading")) {
                const currentErrorH5 = nowPlayingForm.querySelector(".errorUserInputHeading");
                currentErrorH5.remove();
            }

            // Get movie list and display results. Show loading spinner while waiting for API response.
            const UserInputCountryCode = nowPlayingForm.querySelector("#country-input").value.trim();
            const api4Container = document.querySelector("#api4-container");
            showSpinner(api4Container);
            const movieList = await getNowPlayingMovies(UserInputCountryCode);

            displayMovieList(movieList, api4Container);
            
            // Restore scroll position after content update
            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.error(`Error getting now playing movie list: ${error}`);
            displayError("#api4-container", error.message);
            
            // Restore scroll position even on error
            window.scrollTo(0, scrollY);
        }
    });
};
