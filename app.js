// Dog API
// Set up function to call to single dog endpoint
// call this function with new button click event listener
// Call API
// Create new element <img> for dog image with returned URL
// Append <img> element as new child to api0-container div

// API Endpoints
DOG_API = "https://dog.ceo/api/breeds/image/random";

// Initialize variables for all API Card buttons
const api0Button = document.querySelector("#api-0-button");

const singleAPICall = async (endpointURL) => {
    const response = await fetch(endpointURL); // Make call to api & await response
    const data = await response.json(); // Ask browser to parse readable stream into JSON object
    return data.message;
};

// Button Listeners for API Calls
api0Button.addEventListener("click", async () => {
    const dogPhotoURL = await singleAPICall(DOG_API);
    const dogPhotoContainer = document.querySelector("#api0-container");
    const dogIMG = document.createElement("img");

    // Clear previous dog image if it exists
    dogPhotoContainer.innerHTML = "";

    // Create new img element with returned URL
    dogIMG.src = dogPhotoURL;
    dogIMG.classList.add("img-fluid", "rounded", "mx-auto", "d-block");
    dogIMG.alt = "A Random Dog";

    // Append new img element
    dogPhotoContainer.appendChild(dogIMG);
});
