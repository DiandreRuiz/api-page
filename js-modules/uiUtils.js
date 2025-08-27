// Shared UI utilities
export const displayError = (containerID, errorMessage) => {
    const userInputContainer = document.querySelector(containerID);
    const errorHeading = document.createElement("h5");
    errorHeading.innerText = errorMessage;
    errorHeading.classList.add("text-danger");
    errorHeading.classList.add("errorUserInputHeading");
    errorHeading.classList.add("mb-3");
    userInputContainer.innerHTML = "";
    userInputContainer.appendChild(errorHeading);
};

export const replaceIMG = (newImgUrl, containerID, imgPlaceholder) => {
    // Create new <img>
    const newImg = document.createElement("img");
    newImg.src = newImgUrl;
    newImg.placeholder = imgPlaceholder;
    newImg.style.maxWidth = "100%";
    newImg.classList.add("rounded-4");
    newImg.style.border = "solid black 0.8";

    // Clear old <img> if there is one
    const imgContainer = document.querySelector(containerID);
    imgContainer.classList.add("mb-3");
    imgContainer.innerHTML = "";

    // Append new <img> to container
    imgContainer.appendChild(newImg);
};

export const displayTemperature = (confidentMatch, cityName, stateOrProvince, countryName, temperatureF, resultContainerElement) => {
    // Build result elements
    const degreesSymbol = "\u00B0";
    const cityHeading = document.createElement("h1");
    const stateOrProvinceHeading = document.createElement("h5");
    const countryHeading = document.createElement("h6");
    const tempHeading = document.createElement("h2");

    // Only add if not a confident match from the API
    let notSureHeading = null;
    if (!confidentMatch) {
        notSureHeading = document.createElement("h5");
        notSureHeading.innerText = "(Not a confident match)";
        notSureHeading.classList.add("text-danger");
    }

    // Add Bootstrap margin classes to headings
    countryHeading.classList.add("mb-3");
    tempHeading.classList.add("mt-3");

    cityHeading.innerText = `${cityName}`;
    tempHeading.innerText = `${temperatureF}${degreesSymbol}F`;

    if (stateOrProvince && stateOrProvince !== "") {
        stateOrProvinceHeading.innerText = `${stateOrProvince}`;
    }
    if (countryName && countryName !== "") {
        countryHeading.innerText = `${countryName}`;
    }
    // Clear previous results and append result elements
    resultContainerElement.innerHTML = "";
    if (notSureHeading) {
        resultContainerElement.appendChild(notSureHeading);
    }
    resultContainerElement.appendChild(cityHeading);
    resultContainerElement.appendChild(stateOrProvinceHeading);
    resultContainerElement.appendChild(countryHeading);
    resultContainerElement.appendChild(tempHeading);
};

export const displayDadJoke = (dadJoke, resultContainerElement) => {
    // Build result Element
    const dadJokeHeading = document.createElement("h5");
    dadJokeHeading.innerText = dadJoke;

    // Clear prevous results and append result element
    resultContainerElement.innerHTML = "";
    resultContainerElement.appendChild(dadJokeHeading);
};

export const displayMovieList = (movieList, resultContainerElement) => {
    // Build result Element
    const movieListUl = document.createElement("ul");
    movieListUl.style.textDecoration = "none";
    movieListUl.style.listStyleType = "none";
    movieListUl.classList.add("text-center", "list-inline");
    movieList.forEach((movieName) => {
        // Add all movie names to <ul> as <li>
        const liElement = document.createElement("li");
        liElement.innerText = movieName;
        movieListUl.appendChild(liElement);
    });
    // Clear prevous results and append result element
    resultContainerElement.innerHTML = "";
    resultContainerElement.appendChild(movieListUl);
};
