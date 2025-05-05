const apiKey = "f8b4bcd65146734ce66970df1b0f7186"; // Replace with your actual API key

// Function to get weather by city name
function getWeather() {
    let city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    showLoading();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            hideLoading();
            displayWeather(data);
        })
        .catch(error => {
            hideLoading();
            console.error("Error fetching data:", error);
        });
}

// Function to get weather by user's location
function getLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    hideLoading();
                    displayWeather(data);
                })
                .catch(error => {
                    hideLoading();
                    console.error("Error fetching data:", error);
                });
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to display weather data
function displayWeather(data) {
    if (data.cod === "404") {
        document.getElementById("weather-info").innerHTML = "City not found!";
        return;
    }

    let weatherCondition = data.weather[0].main.toLowerCase(); // Get weather condition

    // Change background color based on weather condition
    changeBackground(weatherCondition);

    let weatherDetails = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weather-info").innerHTML = weatherDetails;
}

// Function to change background color based on weather
function changeBackground(condition) {
    let body = document.body;

    if (condition.includes("clear")) {
        body.style.background = "#4facfe"; // Clear sky - Blue
    } else if (condition.includes("cloud")) {
        body.style.background = "#b0bec5"; // Cloudy - Gray
    } else if (condition.includes("rain")) {
        body.style.background = "#78909c"; // Rainy - Dark Gray
    } else if (condition.includes("thunderstorm")) {
        body.style.background = "#616161"; // Thunderstorm - Dark
    } else if (condition.includes("snow")) {
        body.style.background = "#e3f2fd"; // Snowy - Light Blue
    } else {
        body.style.background = "#ffffff"; // Default - White
    }
}

// Show loading message
function showLoading() {
    document.getElementById("weather-info").innerHTML = "<p>Loading...</p>";
}

// Hide loading message
function hideLoading() {
    document.getElementById("weather-info").innerHTML = "";
}
