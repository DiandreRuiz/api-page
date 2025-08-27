import { singleAPICall } from "./apiClient.js";
import { displayDadJoke } from "./uiUtils.js";
import { displayError } from "./uiUtils.js";

const DAD_JOKE_API = "https://icanhazdadjoke.com/";

const getDadJoke = async () => {
    // 'Accept' header is required
    const dadJokeResponse = await singleAPICall(DAD_JOKE_API, { Accept: "application/json" });
    const dadJokeData = await dadJokeResponse.json();
    const dadJoke = dadJokeData.joke;
    return dadJoke;
};

// Event Handlers
export const setupDadJokeAPIHandler = () => {
    const jokeButton = document.querySelector("#api-3-button");
    jokeButton.addEventListener("click", async () => {
        try {
            const api3Container = document.querySelector("#api3-container");
            const dadJoke = await getDadJoke();
            displayDadJoke(dadJoke, api3Container);
        } catch (error) {
            console.error(`Error getting a dad joke: ${error}`);
            displayError("#api3-container", error.message);
        }
    });
};
