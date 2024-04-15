//define global variables
const cityFormEl = document.querySelector('.cityForm')
const cityInput = document.querySelector('#cityName')
//form submit handler
const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const city = cityInput.value.trim();
  
    if (city) {
      getCityCoords(city);
  
      repoContainerEl.textContent = '';
      cityInput.value = '';
    } else {
      alert('Please enter a valid City');
    }
  };
//fetch weather api data
//fetch command to openweatherAI, api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const getWeather = function () {

}

//another fetch command to get city lon and lat, http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const getCityCoords = function (city) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=f0bf82795e5d7afe9c785c5b5e558533`

    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        }
    });
};

//function to display error message if city not found
//take data and create new elements
// add new elements to page
//store searches into local storage
//pull previous searches from local storage on page startup

//add event listener for city input
cityFormEl.addEventListener('submit', formSubmitHandler);