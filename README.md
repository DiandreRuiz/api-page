# Fun APIs - Interactive Web Application

A modern, modular JavaScript application that demonstrates integration with multiple external APIs. Built with ES6 modules, Bootstrap 5, and modern web development practices.

## 🚀 Features

### 1. Random Dog Photos 🐶
- Fetches random dog images from the Dog API

### 2. Random Cat Photos 🐱
- Retrieves random cat images from the Cat API

### 3. Weather Information 🌦️
- Get current temperature for any city worldwide
- Uses geocoding to convert city names to coordinates
- Displays temperature in Fahrenheit with location details
- Form-based input with validation

### 4. Dad Jokes 🥁
- Fetches random dad jokes from icanhazdadjoke.com
- Instant joke delivery with loading states

### 5. Now Playing Movies 🎬
- Shows currently playing movies in theaters by country
- Uses The Movie Database (TMDB) API
- Country code input (e.g., US, NZ, CA)
- Filters out adult content automatically

## 📁 Project Structure

```
api-page/
├── app.js                 # Main application entry point
├── index.html             # Main HTML file with Bootstrap styling
├── css/
│   └── styles.css         # Custom CSS styles
├── js-modules/
│   ├── apiClient.js       # Shared HTTP client utilities
│   ├── animalAPI.js       # Dog and Cat API functionality
│   ├── weatherAPI.js      # Weather API with geocoding
│   ├── jokeAPI.js         # Dad joke API integration
│   ├── tmdbAPI.js         # Movie database API
│   └── uiUtils.js         # Shared UI utilities and display functions
├── config/
│   └── config.json        # API keys and configuration
├── assets/
│   └── icon.png           # Application icon
└── README.md              # This file
```

## 🛠️ Technical Architecture

### Module System
- **ES6 Modules**: Clean import/export syntax
- **Separation of Concerns**: Each API has its own module
- **Shared Utilities**: Common functions in `apiClient.js` and `uiUtils.js`

### Key Components

#### `app.js` (Main Entry Point)
- Initializes all API handlers when DOM loads
- Clean, minimal setup code
- Modular initialization pattern

#### `apiClient.js`
- Centralized HTTP client with `singleAPICall()` function
- Consistent error handling across all APIs
- Reusable fetch wrapper

#### `uiUtils.js`
- Shared UI components and utilities:
  - `displayError()`: Consistent error messaging
  - `replaceIMG()`: Image display with fallbacks
  - `displayTemperature()`: Weather result formatting
  - `displayDadJoke()`: Joke presentation
  - `displayMovieList()`: Movie list rendering
  - `showSpinner()`: Loading state management

#### API Modules
Each API module follows a consistent pattern:
- **Data functions**: Handle API calls and data processing
- **Event handlers**: Manage user interactions
- **Setup functions**: Initialize event listeners
- **Error handling**: Graceful error management

## 🎨 User Experience Features

### Loading States
- Spinner animations during API calls
- Visual feedback for all async operations

### Error Handling
- User-friendly error messages
- Graceful degradation when APIs fail
- Console logging for debugging

### Responsive Design
- Bootstrap 5 grid system
- Mobile-friendly card layout
- Consistent styling across all features

### Form Validation
- Input validation for weather and movie searches
- Clear placeholder text and instructions
- Prevented form submission scrolling issues

## 🔧 Setup and Configuration

### Prerequisites
- Modern web browser with ES6 module support
- Local web server (required for ES6 modules)


### API Configuration
The application uses the following external APIs:
- **Dog API**: No API key required
- **Cat API**: No API key required
- **OpenWeatherMap**: Free tier (geocoding and weather)
- **icanhazdadjoke**: No API key required
- **The Movie Database (TMDB)**: Requires API key in `config/config.json`

## 🚀 Development

### Adding New APIs
1. Create a new module in `js-modules/`
2. Follow the established pattern:
   ```javascript
   import { singleAPICall } from "./apiClient.js";
   import { showSpinner, displayError } from "./uiUtils.js";
   
   // API functions
   const getNewData = async () => { /* ... */ };
   
   // Event handlers
   export const setupNewAPIHandlers = () => {
       // Event listener setup
   };
   ```
3. Import and initialize in `app.js`
4. Add corresponding HTML elements

### Code Quality
- **Modular Design**: Each feature is self-contained
- **Error Handling**: Comprehensive error management
- **User Experience**: Loading states and feedback
- **Accessibility**: Proper ARIA labels and semantic HTML

## 📱 Browser Support
- Modern browsers with ES6 module support
- Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+

## 🤝 Contributing
This project demonstrates best practices for:
- Modular JavaScript architecture
- API integration patterns
- User experience design
- Error handling strategies
- Responsive web development

## 📄 License
This project is for educational purposes and demonstrates modern web development techniques. 