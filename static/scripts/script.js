'use strict'
window.onload = function() {
    weather.showWeather();
}

// Weather obj
var weather = {
  id: 0,
  showWeather: function() {
       var target = {
         latitude: 0,
         longitude: 0
      };
       var getPosition = (position) => {
        var link = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon=' + position.coords.longitude
        +'&units=metric&lang=ru&appid=b231606340553d9174136f7f083904b3';
        this.getRequest(link);
       }
        navigator.geolocation.clearWatch(this.id)
          return this.id = navigator.geolocation.watchPosition(getPosition);

  },
  getRequest: function(link) {
    var $this = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', link , true)
    xhr.onreadystatechange = function(e) {
      if (this.readyState == 4) {
        if(this.status == 200) {
          var response = JSON.parse(this.responseText);
          $this.showWeatherData(response);
          }
        }
      }
    xhr.send(null);
  },
  showWeatherData: function(response) {
    showIcon(response);
    temperature.innerHTML = response.main.temp + " &deg;C";
    humidity.innerHTML = response.main.humidity;
    description.innerHTML = response.weather[0].description;
  },
  showCityWeather: function() {
     var getPosition = () => {
      var cityName = choiseCityName.value;
      var link = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=ru&appid=b231606340553d9174136f7f083904b3';
      return this.getRequest(link);
  }
    navigator.geolocation.clearWatch(this.id)
    return this.id = navigator.geolocation.watchPosition(getPosition);
  }
};
// Functions
  function showIcon(response) {
    var id = response.weather[0];
    for (var key in id) {
      if (key == "id") {
          id = id[key];
          var codes = {
            P: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232], //Thunderlight
            Q: [300, 301, 302, 310, 311, 312, 313, 314, 321], //Dizzle
            R: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531], //Rain
            W: [600, 601, 602, 611, 612, 615, 616, 620, 621, 622], // Snow
            M: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781], // Fog
            B: [800], // Clear
            H: [801], // Few clouds
            N: [802], // Scattered clouds
            Y: [803, 804] // Broken clouds
            };
      var data = ')'; // If n/a
      for (var symbol in codes) {
        if (codes[symbol].indexOf(id) >= 0) {
          data = symbol;
        }
      }
      return icon.setAttribute("data-icon", data);
      }
    }
  };


   getCity.addEventListener('click', function() {
     return weather.showCityWeather();
   });
   myGeoWeather.addEventListener('click', function() {
     return weather.showWeather();
   })


   choiseCityName.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        return weather.showCityWeather();
    }
    // Отменяем действие браузера
    return false;
}
