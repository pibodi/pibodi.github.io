
  async function getRequest(url) {
    let response = await fetch(url);
    return await response.json().catch((err) => new Error(response.status));
  }
  async function getJson(url) {
      let json = await getRequest(url).catch((err) => console.log(err));
      okFunc(json);
  }

  let $input = document.getElementById('choiseCityName');
  const okFunc = (json) => {
    try {
      if (json.cod == '200') {
        dataLayer.push({
          "event": "Ajax_request",
          'category': 'get_weather',
          'action': 'ajax_request'
        })
        if ($input._tippy) {
          $input._tippy.destroy();
        }
        $input.focus();
        createChart(json);
        return weather.showWeatherData(json);
       }
       else {
         throw new Error();
       }
    } catch (err) {
       errorFunc(json);
    }
  }

  const errorFunc = (json) => {
    try {
      if (!json) {
        return console.log(new Error('json undefined'))
      }
      if (json.cod == '404')  {
        tippy($input, tippy_options);
        return console.log(new Error(`${json.cod} ${json.message}`));
      }
      else {
        return console.log(new Error(`${json.cod} ${json.message}`));
      }
    } catch (err) {
        console.log(err);
      }
    }



let tippy_options = {
  content: 'Sorry we can not find your city',
  placement: 'top',
  delay: [20, 0],
  interactive: true,
  showOnInit: true,
  trigger: 'click',
  onShown() {
   $input.focus()
 },
  size: 'regular',
}
