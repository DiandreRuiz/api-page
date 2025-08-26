// Animal Pictures API Module
import { singleAPICall } from './apiClient.js';
import { replaceIMG, errorDisplay } from './uiUtils.js';

// API Endpoints
const DOG_IMG_API = "https://dog.ceo/api/breeds/image/random";
const CAT_IMG_API = "https://api.thecatapi.com/v1/images/search";

// Animal API Functions
export const getDogImage = async () => {
    const dogPhotoResponse = await singleAPICall(DOG_IMG_API);
    const dogPhotoData = await dogPhotoResponse.json();
    return dogPhotoData.message;
};

export const getCatImage = async () => {
    const catPhotoResponse = await singleAPICall(CAT_IMG_API);
    const catPhotoData = await catPhotoResponse.json();
    return catPhotoData[0].url;
};

// Event Handlers
export const setupAnimalAPIHandlers = () => {
    const dogAPIButton = document.querySelector("#api-0-button");
    const catAPIButton = document.querySelector("#api-1-button");

    dogAPIButton.addEventListener("click", async () => {
        try {
            const dogPhotoURL = await getDogImage();
            replaceIMG(dogPhotoURL, "#api0-container", "Random Dog Photo");
        } catch (error) {
            console.error(`Dog API error: ${error}`);
            errorDisplay("#api0-container", "Issue getting dog, please try again");
        }
    });

    catAPIButton.addEventListener("click", async () => {
        try {
            const catPhotoURL = await getCatImage();
            replaceIMG(catPhotoURL, "#api1-container", "Random Cat Photo");
        } catch (error) {
            console.error(`Cat API Error: ${error}`);
            errorDisplay("#api1-container", "Issue getting cat please try again");
        }
    });
}; 