//define global variables
const cityFormEl = document.querySelector('.cityForm')
const cityInput = document.querySelector('#cityName')
const currentWeatherContainer = document.querySelector('#currentWeather')
const futureWeatherContainer = document.querySelector('#fiveDay')
//form submit handler
const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();
    //console.log(city);

    getCityCoords(city);
}

// //fetch weather api data
const getCurrentWeather = function (coords) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=f0bf82795e5d7afe9c785c5b5e558533&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //console.log(data);
                    //put name of city, date, temp, wind speed, weather description and humidity into an object
                    const currentWeatherData = {
                        name: (data.name),
                        temp: (data.main.temp),
                        wind: (data.wind.speed),
                        humidity: (data.main.humidity),
                        weather: (data.weather),
                    }
                    displayWeather(currentWeatherData)
                })
            }
        })
}

// //fetch command to openweatherAI, api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const getFutureWeather = function (coords) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=f0bf82795e5d7afe9c785c5b5e558533&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    let futureWeatherArray = []
                    for (let i = 0; i < data.list.length; i++) {
                        const futureWeatherData = {
                            temp: (data.list[i].main.temp),
                            wind: (data.list[i].wind.speed),
                            humidity: (data.list[i].main.humidity),
                            weather: (data.list[i].weather),
                        }
                        futureWeatherArray.push(futureWeatherData)
                    }
                    console.log(futureWeatherArray)
                    return futureWeatherArray
                }
                )
            }
        })
}




// //another fetch command to get city lon and lat, http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const getCityCoords = function (city) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=f0bf82795e5d7afe9c785c5b5e558533`

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (let i = 0; i < data.length; i++) {
                        const coords = {
                            lat: (data[i].lat),
                            lon: (data[i].lon)
                        }
                        getFutureWeather(coords);
                        getCurrentWeather(coords)
                    }
                })
            }
        })
};

//take data and create new elements
const displayWeather = function (currentWeatherData) {
    
}

// add new elements to page
//store searches into local storage
//pull previous searches from local storage on page startup

//add event listener for city input
cityFormEl.addEventListener('submit', formSubmitHandler);