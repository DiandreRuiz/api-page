// Quick terminal test for joke API
import fetch from 'node-fetch'; // You'll need to install this: npm install node-fetch

const DAD_JOKE_API = "https://icanhazdadjoke.com/";

// Mock the singleAPICall function for terminal testing
const singleAPICall = async (endpointURL) => {
    const response = await fetch(endpointURL, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'MyApp/1.0'
        }
    });
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
    }
    return response;
};

// Test the joke function
const getDadJoke = async () => {
    const dadJokeResponse = await singleAPICall(DAD_JOKE_API);
    const dadJokeData = await dadJokeResponse.json();
    return dadJokeData.joke;
};

// Run the test
console.log('Testing joke API...');
getDadJoke()
    .then(joke => {
        console.log('✅ Success! Joke:', joke);
    })
    .catch(error => {
        console.error('❌ Error:', error.message);
    }); 