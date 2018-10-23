// $(document).ready(function() {
//     $('#choiseCityName').typeahead({
//         autoSelect: true,
//         minLength: 1,
//         delay: 40,
//         source: function (query, process) {
//             $.ajax({
//                 url: 'city.list.json',
//                 data: {query: query}
//             }).done(function(response) {
//                 // get the response and create a new array of Strings
//
//                   var names = $.each (response, function(item) {
//                     var div = document.createElement('div');
//                     div.innerText = item.name
//                     console.log(item.name);
//                     return item.name;
//                   });
//                   return process(names);
//                 });
//               }
//             });
//           });


// $('#getCity').click(weather.showCityWeather())
