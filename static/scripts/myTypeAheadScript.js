jQuery(document).ready(function(){
  $.get("major_cities.json", function(data){
    $("#choiseCityName").typeahead({ source:data,
      displayText: function (item) {
      	return item.name;
      },
      afterSelect: function(item) {
        weather.showCityWeather($("#choiseCityName").val())
      },
      highlighter: function(item, data) {
          return `<div>${item}<strong>${data.country}</strong></div>`
      },
    });
  },'json')
});
