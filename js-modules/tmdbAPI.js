import { singleAPICall } from "./apiClient.js";
import { errorDisplay } from "./uiUtils.js";

// Load in API creds
export async function retrieveAPIKey() {
    const tmdbJSON = await fetch("../config.json");
    const data = await tmdbJSON.json();
    console.log(data);
}

// Function that returns result from api call

// Function that sets up event handler for the button and is exported
