# API Page - Modular JavaScript Application

This application demonstrates how to organize JavaScript code into modules for better maintainability and separation of concerns.

## Project Structure

```
api-page/
├── app.js                 # Main entry point
├── modules/
│   ├── apiClient.js       # Shared API utilities
│   ├── animalAPI.js       # Dog and Cat API functionality
│   ├── weatherAPI.js      # Weather API functionality
│   └── uiUtils.js         # Shared UI utilities
├── index.html             # Main HTML file
├── styles.css             # CSS styles
└── README.md              # This file
```

## Module Breakdown

### `app.js` (Main Entry Point)
- Imports and initializes all API modules
- Sets up the application when DOM is loaded
- Clean and minimal - just handles initialization

### `modules/apiClient.js`
- Shared HTTP client for making API requests
- Contains `singleAPICall()` function used by all modules
- Centralized error handling for network requests

### `modules/animalAPI.js`
- Handles Dog and Cat image APIs
- Contains `getDogImage()` and `getCatImage()` functions
- Sets up event listeners for animal API buttons
- Exports `setupAnimalAPIHandlers()` for initialization

### `modules/weatherAPI.js`
- Handles weather-related functionality
- Contains geocoding and temperature fetching functions
- Sets up form submission handler for weather lookup
- Exports `setupWeatherAPIHandlers()` for initialization

### `modules/uiUtils.js`
- Shared UI utility functions
- Contains `errorDisplay()`, `replaceIMG()`, and `displayTemperature()`
- Reusable across all modules

## Benefits of This Structure

1. **Separation of Concerns**: Each module has a specific responsibility
2. **Reusability**: Shared functions can be used across modules
3. **Maintainability**: Easier to find and modify specific functionality
4. **Testability**: Individual modules can be tested in isolation
5. **Scalability**: Easy to add new API modules following the same pattern

## How to Add a New API Module

1. Create a new file in the `modules/` directory (e.g., `jokeAPI.js`)
2. Import shared utilities from `apiClient.js` and `uiUtils.js`
3. Create your API functions and event handlers
4. Export a setup function (e.g., `setupJokeAPIHandlers()`)
5. Import and call the setup function in `app.js`

## Error Handling

The application follows the industry standard pattern:
- Helper functions throw errors when something goes wrong
- Event listeners catch errors and display appropriate UI messages
- All error handling is done at the highest level (event listeners)

## Running the Application

Simply open `index.html` in a web browser. The application uses ES6 modules, so it needs to be served from a web server (not opened directly as a file). 