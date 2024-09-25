// Define the API key and base URL for fetching weather data
const apiKey = "380fc795683b6c4ddbf7e854535dba0b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the search input and button elements from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // To update the weather icon

// Function to check the weather for a given city
async function checkWeather(city) {
    // Fetch weather data from the OpenWeather API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the city was found (status code 404)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather details
    } else {
        // Parse the response as JSON
        const data = await response.json();

        // Update the UI with the city name, temperature, humidity, and wind speed
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Update the weather icon based on the weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "Images/cloud.png";
                break;
            case "Clear":
                weatherIcon.src = "Images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "Images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "Images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "Images/mist.png";
                break;
            default:
                weatherIcon.src = "Images/default.png"; // Fallback icon
        }

        // Show weather details and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the search button to trigger weather check
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Call the checkWeather function with the input value
});
