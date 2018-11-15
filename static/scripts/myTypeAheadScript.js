var $input = $('.typeahead');
var $drpdItem
$input.typeahead({
  minLength: 2,
  source: $.get("cities.json", function(data){
  $("#choiseCityName").typeahead({ source:data,
    displayText: function (item) {
    	return item.name;
    },
    afterSelect: function(item) {
      
      return weather.showCityWeather($input.val())
    },
    highlighter: function(item, data) {
        return `<div> ${item} <strong>${data.country}</strong></div>`
    }
   });
},'json')});
