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

const singleAPICall = async (endpointURL) => {
    const response = await fetch(endpointURL); // Make call to api & await response
    return response;
};

// Replace <img> in API card
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

// Random Image Generators (0 & 1)
dogAPIButton.addEventListener("click", async () => {
    const dogPhotoResponse = await singleAPICall(DOG_IMG_API);
    const dogPhotoData = await dogPhotoResponse.json();
    const dogPhotoURL = dogPhotoData.message;
    replaceIMG(dogPhotoURL, "#api0-container", "Random Dog Photo");
});

catAPIButton.addEventListener("click", async () => {
    const catPhotoResponse = await singleAPICall(CAT_IMG_API);
    const catPhotoData = await catPhotoResponse.json();
    const catPhotoURL = catPhotoData[0].url;
    replaceIMG(catPhotoURL, "#api1-container", "Random Cat Photo");
});

//
