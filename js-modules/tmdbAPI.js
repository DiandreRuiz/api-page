import { singleAPICall } from "./apiClient.js";
import { errorDisplay } from "./uiUtils.js";

// Load in API creds
const api_key = await fetch("../config.json");
console.log(api_key);

// Function that returns result from api call

// Function that sets up event handler for the button and is exported
