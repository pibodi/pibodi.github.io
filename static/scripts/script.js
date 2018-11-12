
window.onload = () => {
    weather.showWeather();
     shake(myGeoWeather);
};
// Weather object
const weather = {
    showWeather() {
      let getPosition = (position) => {
      let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=b231606340553d9174136f7f083904b3`;
      this.getRequest(link);
      }
      return navigator.geolocation.getCurrentPosition(getPosition);
    },
    showCityWeather() {
      let link = `https://api.openweathermap.org/data/2.5/weather?q=${choiseCityName.value}&units=metric&appid=b231606340553d9174136f7f083904b3`;
      return this.getRequest(link);
    },
    showWeatherData(response) {
      let descrpt = response.weather[0].description;
      descrpt =  descrpt[0].toUpperCase() + descrpt.slice(1);
      let responseTemplate = `
        <div id="cityName">${response.name}</div>
        <div id="temperature">${response.main.temp} &deg;C</div>
        <div id="humidity">Hymidity: ${response.main.humidity} %</div>
        <div id="description"> ${descrpt} </div>
        `;
      showIcon(response);
      indicators.innerHTML = responseTemplate;
    },
    getRequest(link) {
      fetch(link).then( response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Error: status ${response.status}.`);
        }).then(response => {
            return this.showWeatherData(response);
          })
    },
};
// Functions
  function showIcon(response, data = ')') {
    let id = response.weather[0].id;
    let codes = {
      P: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232], //Thunderlight
      Q: [300, 301, 302, 310, 311, 312, 313, 314, 321], //Dizzle
      R: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531], //Rain
      W: [600, 601, 602, 611, 612, 615, 616, 620, 621, 622], // Snow
      M: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781], // Fog
      B: [800], // Clear
      H: [801], // Few clouds
      N: [802], // Scattered clouds
      Y: [803, 804], // Broken clouds
      };
      for (let symbol in codes) {
        if (codes[symbol].indexOf(id) >= 0) {
          data = symbol;
        }
      }
      return icon.setAttribute('data-icon', data);
  };
    function shake(elem) {
      setInterval(() => {
        elem.classList.add('shake');
        setTimeout(() => {
          elem.classList.remove('shake');
        }, 500)
    }, 5000)
  };

   getCityWeather.addEventListener('click', weather.showCityWeather);
   myGeoWeather.addEventListener('click',  weather.showWeather);
