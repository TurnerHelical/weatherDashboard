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
                    displayCurrentWeather(currentWeatherData)
                })
            }
        })
}

// //fetch command to openweatherAI, api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const getFutureWeather = function (coords) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&cnt=5&appid=f0bf82795e5d7afe9c785c5b5e558533&units=imperial`
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
                    console.log(futureWeatherArray);
                    displayFutureWeather(futureWeatherArray)
            })
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
const displayCurrentWeather = function (currentWeatherData) {

    $(currentWeatherContainer).html("");

    //console.log(currentWeatherData);
    const weatherIcon = document.createElement('img')
    $(weatherIcon).attr('src',`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`)

    const currentWeatherCard = document.createElement('div');
    $(currentWeatherCard).attr('class','col-11 border border-dark m-2 bg-primary-subtle p-2 text-center')

    const heading = document.createElement('h2')
    $(heading).attr('class','test')
    $(heading).text(`${currentWeatherData.name}`).append(weatherIcon)

    const weatherInfo = document.createElement('p')
    $(weatherInfo).html(`Temperature: ${currentWeatherData.temp}°<br /> Humidity: ${currentWeatherData.humidity}%<br /> Wind: ${currentWeatherData.wind} mph<br /> Weather: ${currentWeatherData.weather[0].description}`)

    currentWeatherCard.append(heading)
    currentWeatherCard.append(weatherInfo)
    currentWeatherContainer.append(currentWeatherCard);
}

const displayFutureWeather = function (futureWeatherArray) {
console.log(futureWeatherArray);
    $(futureWeatherContainer).html("");

    for (let i = 0; i <futureWeatherArray.length; i++) {

        const weatherIcon = document.createElement('img')
        $(weatherIcon).attr('src',`https://openweathermap.org/img/wn/${futureWeatherArray[i].weather[0].icon}@2x.png`)

        const futureWeatherCard = document.createElement('div');
        $(futureWeatherCard).attr('class','col-md-1 col-lg-2 border border-dark m-2 bg-primary-subtle p-2 text-center')
        $(futureWeatherCard).append(weatherIcon)

        const weatherInfo = document.createElement('p')
        $(weatherInfo).html(`Temperature: ${futureWeatherArray[i].temp}°<br /> Humidity: ${futureWeatherArray[i].humidity}%<br /> Wind: ${futureWeatherArray[i].wind} mph<br /> Weather: ${futureWeatherArray[i].weather[0].description}`)

    
    futureWeatherCard.append(weatherInfo)
    futureWeatherContainer.append(futureWeatherCard);
}}

//add event listener for city input
cityFormEl.addEventListener('submit', formSubmitHandler);