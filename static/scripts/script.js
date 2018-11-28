
window.onload = () => {
    weather.showWeather();
    shake(myGeoWeather);
};
// Weather object
const weather = {
    showWeather() {
      let getPosition = (position) => {
      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=75794b9ace3c41343121677d196d1d07`;
      return getJson(url);
      }
      return navigator.geolocation.getCurrentPosition(getPosition);
    },
    showCityWeather() {
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${choiseCityName.value}&units=metric&appid=75794b9ace3c41343121677d196d1d07`;
      return getJson(url);
    },
    showWeatherData(response, i = 0) {

      let descrpt = response.list[i].weather[0].description;
      descrpt =  descrpt[0].toUpperCase() + descrpt.slice(1);
      let date = moment(response.list[i].dt_txt).format('MMM Do HH:mm')
      let responseTemplate = `
        <div id="cityName">${response.city.name}</div>
        <div id="temperature">${Math.round(response.list[i].main.temp)} &deg;C</div>
        <div id="humidity">Hymidity: ${response.list[i].main.humidity} %</div>
        <div id="description"> ${descrpt} </div>
        <div id="date"> ${date}</div>
        `;
      showIcon(response, i);
      indicators.innerHTML = responseTemplate;
    },
      };
// Functions
  function showIcon(response, i) {
    let data = ')' // when n/a icon
    let id = response.list[i].weather[0].icon;
    let codes = {
      day: {
        B: ['01d'], // Clear
        H: ['02d'], // few clouds
        N: ['03d'], // Scattered clouds
        Y: ['04d'],//Broken clouds
        R: ['09d', '10d'], //Rain
        P: ['11d'], //Thunderlight*
        W: ['13d'], // Snow
        M: ['50d'], // Fog
      },
      night: {
        1: ['01n'],// Clear
        4: ['02n'], // few clouds
        5: ['03n'], // Scattered clouds
        '%':['04n'],//Broken clouds
        8: ['09n', '10n'],//Rain
        6: ['11n'],//Thunderlight*
        '#':['13n'], // Snow
        M: ['50n'],// Fog
      },
      };
        for (let symbol in codes.night) {
          if (codes.night[symbol].indexOf(id) >= 0) {
            data = symbol;
          }
          else {
            for (let symbol in codes.day) {
              if (codes.day[symbol].indexOf(id) >= 0) {
                data = symbol;
              }
            }
          }
        }
        return icon.setAttribute('data-icon', data);
    }

    function shake(elem) {
      setInterval(() => {
        elem.classList.add('shake');
        setTimeout(() => {
          elem.classList.remove('shake');
        }, 500)
    }, 5000)
  };

   getCityWeather.addEventListener('click', () => weather.showCityWeather());
