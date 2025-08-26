// Main Application Entry Point
import { setupAnimalAPIHandlers } from './js-modules/animalAPI.js';
import { setupWeatherAPIHandlers } from './js-modules/weatherAPI.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup all API handlers
    setupAnimalAPIHandlers();
    setupWeatherAPIHandlers();
    
    console.log('Application initialized successfully');
});
