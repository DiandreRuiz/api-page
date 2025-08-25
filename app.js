// Dog API
// Set up function to call to single dog endpoint
// call this function with new button click event listener
// Call API
// Create new element <img> for dog image with returned URL
// Append <img> element as new child to api0-container div

// API Endpoints
DOG_IMG_API = "https://dog.ceo/api/breeds/image/random";
CAT_IMG_API = "https://api.thecatapi.com/v1/images/search";

// Initialize variables for all API Card buttons
const dogAPIButton = document.querySelector("#api-0-button");
const catAPIButton = document.querySelector("#api-1-button");
const averageTempButton = document.querySelector("#api-2-button");

const singleAPICall = async (endpointURL) => {
    try {
        const response = await fetch(endpointURL); // Make call to api & await response
        return response;
    } catch (err) {
        console.error(`Caught error ${err}`);
        return null;
    }
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

const errorIMG = (containerID) => {
    const imgContainer = document.querySelector(containerID);
    const errorHeading = document.createElement("h1");
    errorHeading.innerText = "Issue with request please try again!";
    errorHeading.classList.add("text-danger");
    imgContainer.appendChild(errorHeading);
    console.log(imgContainer.children);
};

dogAPIButton.addEventListener("click", async () => {
    const dogPhotoResponse = await singleAPICall(DOG_IMG_API);
    if (dogPhotoResponse === null) {
        errorIMG("#api0-container");
    } else {
        const dogPhotoData = await dogPhotoResponse.json();
        const dogPhotoURL = dogPhotoData.message;
        replaceIMG(dogPhotoURL, "#api0-container", "Random Dog Photo");
    }
});

catAPIButton.addEventListener("click", async () => {
    const catPhotoResponse = await singleAPICall(CAT_IMG_API);
    if (catPhotoResponse === null) {
        errorIMG("#api1-container");
    } else {
        const catPhotoData = await catPhotoResponse.json();
        const catPhotoURL = catPhotoData[0].url;
        replaceIMG(catPhotoURL, "#api1-container", "Random Cat Photo");
    }
});

// Weather Apps (2 & 3)
const getCitySearch = async (citySearchString) => {
    const baseAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";
    const searchParams = new URLSearchParams({
        baseAPIUrl: baseAPIUrl,
        name: citySearchString,
        count: 1,
        language: "en",
        format: "json",
    });
    const requestURL = `${baseAPIUrl}?${searchParams.toString()}`;
    const citySearchResponse = await singleAPICall(requestURL);
    const citySearchData = await citySearchResponse.json();
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

const getForecastLatLong = async (latitude, longitude) => {
    const baseAPIUrl = "https://api.open-meteo.com/v1/forecast";
    const searchParams = new URLSearchParams({
        baseAPIUrl: baseAPIUrl,
        latitude: latitude,
        longitude: longitude,
    });
};

averageTempButton.addEventListener("click", async (citySearch) => {
    const cityInformation = getCitySearch("Philadelphia");
});
