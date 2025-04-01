const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ff691566be604d2cf54c46b885e08171";

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim(); // trim to remove leading/trailing spaces

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error); // log to the console for debugging
            displayError(error.message); // Display error message to user
        }
    } else {
        displayError("Please enter a city"); // If no city is entered
    }
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(response.status === 404 ? "No city found" : "Could not fetch weather data");
        }

        return await response.json();
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
}

// Function to display weather information on the page
function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";  // Clear previous data
    card.style.display = "flex";  // Show the card

    const cityDisplay = createElement("h1", city);
    const tempDisplay = createElement("p", `${convertKelvinToFahrenheit(temp)}°F`);
    const humidityDisplay = createElement("p", `Humidity: ${humidity}%`);
    const descDisplay = createElement("p", description);
    const weatherEmoji = createElement("p", getWeatherEmoji(id));

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to the card
    card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherEmoji);
}

// Utility function to create an HTML element
function createElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
}

// Function to convert Kelvin to Fahrenheit
function convertKelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(1);
}

// Function to get an emoji based on the weather condition
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

// Function to display error message
function displayError(message) {
    const errorDisplay = createElement("p", message);
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";  // Clear previous data
    card.style.display = "flex";  // Show the card with error
    card.appendChild(errorDisplay);  // Append error message to the card
}
 
