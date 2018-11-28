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
  },'json');
});
$('#choiseCityName').keydown(function(e) {
  if (e.keyCode === 13) {
    return weather.showCityWeather($("#choiseCityName").val())
  }
});

$('#myGeoWeather').on('click', function(){
   return weather.showWeather();
})
//from stackoverflow
jQuery(function ($) {
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("DOMMouseScroll mousewheel", function (event) {
            var oEvent = event.originalEvent,
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
                position = $(this).scrollLeft();
            position += direction > 0 ? -amount : amount;
            $(this).stop().animate({scrollLeft: position}, 270)
            event.preventDefault();
        })
    };
});
$(document).ready(function(){
    $('#chart').hScroll(200);
});
