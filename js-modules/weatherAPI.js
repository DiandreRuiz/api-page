// Weather API Module
import { singleAPICall } from "./apiClient.js";
import { displayError, displayTemperature } from "./uiUtils.js";

// API Endpoints
const OPEN_METEO_GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const OPEN_METEO_FORECAST_API = "https://api.open-meteo.com/v1/forecast";

// Weather API Functions
const getCitySearch = async (citySearchString) => {
    const searchParams = new URLSearchParams({
        name: citySearchString,
        count: 1,
        language: "en",
        format: "json",
    });

    const requestURL = `${OPEN_METEO_GEOCODING_API}?${searchParams.toString()}`;
    const citySearchResponse = await singleAPICall(requestURL);
    const citySearchData = await citySearchResponse.json();

    if (!citySearchData.results || citySearchData.results.length === 0) {
        throw new Error(`City "${citySearchString}" not found.`);
    }

    const firstResult = citySearchData.results[0];
    return {
        cityName: firstResult.name,
        latitude: firstResult.latitude,
        longitude: firstResult.longitude,
    };
};

const getCurrentTempLatLong = async (latitude, longitude) => {
    const searchParams = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m"],
        temperature_unit: "fahrenheit",
        timezone: "auto",
    });

    const requestURL = `${OPEN_METEO_FORECAST_API}?${searchParams.toString()}`;
    const forecastResponse = await singleAPICall(requestURL);
    const forecastData = await forecastResponse.json();
    const currentTemp = forecastData.current.temperature_2m;

    if (!currentTemp) {
        throw new Error(`Error getting temp from Lat / Long: ${latitude} & ${longitude}`);
    }

    return currentTemp;
};

const getUserInputCurrentTemp = async (userInputString) => {
    if (!userInputString || userInputString === "" || userInputString.length === 0) {
        throw new Error("No city provided by user");
    }

    const citySearchResult = await getCitySearch(userInputString);
    const cityCurrentTempResult = await getCurrentTempLatLong(citySearchResult.latitude, citySearchResult.longitude);

    return {
        temperatureF: cityCurrentTempResult,
        cityName: citySearchResult.cityName,
    };
};

// Event Handlers
export const setupWeatherAPIHandlers = () => {
    const averageTempForm = document.querySelector("#api2-form");

    averageTempForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            // Clear currently displayed errors
            const userInputForm = document.querySelector("#api2-form");
            if (userInputForm.querySelector(".errorUserInputHeading")) {
                const currentErrorH5 = userInputForm.querySelector(".errorUserInputHeading");
                currentErrorH5.remove();
            }

            // Calculate temperature and display results
            const api2Container = document.querySelector("#api2-container");
            const userInputString = averageTempForm.querySelector("#city-input").value.trim();
            const userInputStringTempResult = await getUserInputCurrentTemp(userInputString);

            displayTemperature(userInputStringTempResult.cityName, userInputStringTempResult.temperatureF, api2Container);
        } catch (error) {
            console.error(`Error looking up temperature: ${error}`);
            displayError("#api2-form", error.message);
        }
    });
};
