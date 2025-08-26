// Dog API
// Set up function to call to single dog endpoint
// call this function with new button click event listener
// Call API
// Create new element <img> for dog image with returned URL
// Append <img> element as new child to api0-container div

// API Endpoints

// Animal Pictures
DOG_IMG_API = "https://dog.ceo/api/breeds/image/random";
CAT_IMG_API = "https://api.thecatapi.com/v1/images/search";

// Weather
OPEN_METEO_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";
OPEN_METEO_FORECAST = "https://api.open-meteo.com/v1/forecast";

// API Activate Buttons & Forms
const dogAPIButton = document.querySelector("#api-0-button");
const catAPIButton = document.querySelector("#api-1-button");
const averageTempForm = document.querySelector("#api2-form");

// General API Call Function
const singleAPICall = async (endpointURL) => {
    const response = await fetch(endpointURL); // Make call to api & await response
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`); // THROW
    }
    return response;
};

const errorDisplay = (containerID, errorMessage) => {
    const userInputContainer = document.querySelector(containerID);
    const errorHeading = document.createElement("h5");
    errorHeading.innerText = errorMessage;
    errorHeading.classList.add("text-danger");
    errorHeading.classList.add("errorUserInputHeading");
    userInputContainer.appendChild(errorHeading);
};

// Random Image Generators (0 & 1)
const replaceIMG = (newImgUrl, containerID, ImgPlaceholder) => {
    // Create new <img>
    const newImg = document.createElement("img");
    newImg.src = newImgUrl;
    newImg.placeholder = ImgPlaceholder;
    newImg.style.maxWidth = "100%";

    // Clear old <img> if there is one
    const imgContainer = document.querySelector(containerID);
    imgContainer.innerHTML = "";

    // Append new <img> to container
    imgContainer.appendChild(newImg);
};

dogAPIButton.addEventListener("click", async () => {
    try {
        const dogPhotoResponse = await singleAPICall(DOG_IMG_API);
        const dogPhotoData = await dogPhotoResponse.json();
        const dogPhotoURL = dogPhotoData.message;
        replaceIMG(dogPhotoURL, "#api0-container", "Random Dog Photo");
    } catch (error) {
        console.error(`Dog API error: ${error}`);
        errorDisplay("#api0-container", "Issue getting dog, please try again");
    }
});

catAPIButton.addEventListener("click", async () => {
    try {
        const catPhotoResponse = await singleAPICall(CAT_IMG_API);
        const catPhotoData = await catPhotoResponse.json();
        const catPhotoURL = catPhotoData[0].url;
        replaceIMG(catPhotoURL, "#api1-container", "Random Cat Photo");
    } catch (error) {
        console.error(`Cat API Error: ${error}`);
        errorDisplay("#api1-container", "Issue getting cat please try again");
    }
});

// Weather Apps (2 & 3)

const getCitySearch = async (citySearchString) => {
    // Get lat/long for city search string
    const searchParams = new URLSearchParams({
        name: citySearchString,
        count: 1,
        language: "en",
        format: "json",
    });

    const requestURL = `${OPEN_METEO_GEOCODING}?${searchParams.toString()}`;

    // Error handling will bubble up from these calls
    const citySearchResponse = await singleAPICall(requestURL);
    const citySearchData = await citySearchResponse.json();

    // Check if there are no results for their search
    if (!citySearchData.results || citySearchData.results.length === 0) {
        errorDisplay("api2-form", `Could not identify city input: ${citySearchString}`);
        throw new Error(`City ${citySearchString} not found.`);
    }

    const firstResult = citySearchData.results[0];
    const latitude = firstResult.latitude;
    const longitude = firstResult.longitude;
    const cityName = firstResult.name;

    return {
        cityName: cityName,
        latitude: latitude,
        longitude: longitude,
    };
};

const getCurrentTempLatLong = async (latitude, longitude) => {
    // Get current temp for lat/long
    const searchParams = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m"],
        temperature_unit: "fahrenheit",
        timezone: "auto",
    });

    const requestURL = `${OPEN_METEO_FORECAST}?${searchParams.toString()}`;
    const forecastResponse = await singleAPICall(requestURL); // Allow errors to bubble up
    const forecastData = await forecastResponse.json(); // Allow errors to bubble up
    const currentTemp = forecastData.current.temperature_2m;

    if (!currentTemp) {
        errorDisplay("apit2-form", "Internal issue with API please try again.");
        throw new Error(`Error getting temp from Lat / Long: ${searchParams.latitude} & ${searchParams.longitude}`);
    }

    return currentTemp;
};

const userInputCurrentTemp = async () => {
    // COMBINE BOTH HELPER FUNCTIONS FOR FINAL RESULT FROM USER INPUT //

    const userInputString = averageTempForm.querySelector("#city-input").value.trim();
    if (!userInput) {
        errorDisplay("#api2-form", "Please provide a city");
        throw new Error("No city provided by user");
    }

    // Convert user search string to lat/long
    const citySearchResult = await getCitySearch(userInputString); // Allow errors to bubble up
    citySearchResultLat = citySearchResult.latitude;
    citySearchResultLong = citySearchResult.longitude;
    citySearchResultName = citySearchResult.cityName;

    // Get current temperature of this lat/long
    const cityCurrentTempResult = await getCurrentTempLatLong(citySerachResultLat, citySearchResultLong); //Allow errors to bubble up

    return cityCurrentTempResult;
};

averageTempForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear currently displayed errors
    const userInputForm = document.querySelector("#api2-form");
    if (userInputForm.querySelector(".errorUserInputHeading")) {
        const currentErrorH5 = userInputForm.querySelector(".errorUserInputHeading");
        currentErrorH5.remove();
    }

    // Check for user input & call API (invalid input handled in getCurrentTempCitySearch)
});
