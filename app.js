// Main Application Entry Point
import { setupAnimalAPIHandlers } from './js-modules/animalAPI.js';
import { setupWeatherAPIHandlers } from './js-modules/weatherAPI.js';
import { setupDadJokeAPIHandler } from './js-modules/jokeAPI.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup all API handlers
    setupAnimalAPIHandlers();
    setupWeatherAPIHandlers();
    setupDadJokeAPIHandler();
    console.log('Application initialized successfully');
});
