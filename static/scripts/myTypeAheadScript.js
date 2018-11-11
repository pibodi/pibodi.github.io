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
      $('#choiseCityName').on('keyup',function(e) {
       e = e || window.event;
       if (e.keyCode === 13) {
         $input.val(item.name)
          return weather.showCityWeather($input.val());
       }
       return false;
   });
      return weather.showCityWeather($input.val())
    },
    highlighter: function(item, data) {
        return `<div> ${item} <strong>${data.country}</strong></div>`
    }
   });
},'json')});
