  let currentChart;
let currentResponse;

const createChart = response => {
      if (typeof currentChart != 'undefined') {
         currentChart.destroy();
    }
    let chart = document.getElementById('myChart');
    let lastElementPoint;
    chart.classList.add('canvasImportant');
    chart.width = 800;
    chart.height = 400;
    currentResponse = response;
    let list = response.list;
    let data = [];
    let dateFormat = 'h:mm a';
    let currentDate = moment(new Date(list[1].dt_txt), dateFormat);
    let labels = [];
    list.forEach(function(item, i) {
      try {
          let date = new Date(item.dt_txt);
          date = moment(date, dateFormat);
          let tempData = {x: date.valueOf(), y: Math.round(+item.main.temp)}
          data.push(tempData);
          labels.push(date);
      } catch (e) {
        console.log(e);
      }
    });

const getColorsArr = function() {
  let colors = [];
  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      colors.push('white');
    }
    colors.push('red')
  }
  return colors;
}



    let chartOptions = {
      legend: {
         display: false,
      },
      layout: {
        padding: {
            left: 0,
            right: 20,
            top: 0,
            bottom: 0
        }
      },
      hover: {
        onHover: function(e) {
          let point = this.getElementAtEvent(e);
          if (point.length) e.target.style.cursor = 'pointer';
          else e.target.style.cursor = 'default';
        },
      },
      onClick: function(evt, activeElements){
            if (activeElements.length > 0) {
              let lastIndex;

              if (typeof lastElementPoint == 'undefined') {
                 lastElementPoint = activeElements;
                 lastIndex =0
               }
               if (lastIndex != 0) {
                 lastIndex = lastElementPoint[0]._index;
               }

              lastElementPoint = activeElements;
              let currentIndex = activeElements[0]._index;
              let pointBGColor = this.data.datasets[0].pointBackgroundColor;


              if (pointBGColor[currentIndex] == 'white') {
                pointBGColor[currentIndex] = 'red';
                pointBGColor[lastIndex] = 'red';
                this.update();
              }
              else if(pointBGColor[currentIndex] == "red" ){
                pointBGColor[currentIndex] = 'white';
                pointBGColor[lastIndex] ='red';
                this.update();
            }
          }
      },
      tooltips: {
         callbacks: {
           label: function(tooltipItem) {
             return tooltipItem.yLabel;
           }
         },
         enabled: false,
       },
       responsive:false,
       maintainAspectRatio: true,
       scales: {
          xAxes: [{
              gridLines: {
                 display: false,
              },
              type: 'time',
              time: {
                parser: 'HH:mm a',
                unit: 'hour',
                unitStepSize: 3,
                displayFormats: {
                   'hour': 'HH mm',
                },
              },
            }],
          yAxes: [{
              gridLines: {
                drawBorder: false,
                 display: false,
              },
              ticks: {
                stepSize: 5,
                display: false,
              }
            }]
          }
          };
    try {
      currentChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
  					data: data,
  					type: 'line',
  					pointRadius: 5,
            pointBackgroundColor: getColorsArr(),
  					fill: '-2',
  					lineTension: 0,
  					borderWidth: 2,
            borderColor: '#fff',
            backgroundColor: 'red',
            hitRadius: 15
  				}]
      },
      options: chartOptions
  })
    } catch (e) {
      console.log(e);
    }
}

// Define a plugin to provide data labels
        Chart.plugins.register({
            afterDatasetsDraw: function(chart, easing) {
              try {
                let ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    let meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function(element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgb(0, 0, 0)';
                            let fontSize = 12;
                            let fontStyle = 'normal';
                            let fontFamily = 'Arial';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            let dataString = dataset.data[index].y.toString();
                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            let padding = 5;
                            let position = element.tooltipPosition();
                            return ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                        });
                    }
                });
              } catch (e) {
                console.log(e);
              }
            }

        });
        Chart.plugins.register({
          afterDatasetsDraw: function(chart) {
            try {
              document.getElementById('myChart').onclick = function(e) {
                  let activePoint = chart.getElementsAtEvent(e);
                  let selectedPoint = activePoint[0];
                   weather.showWeatherData(currentResponse, selectedPoint._index);

                }
            } catch (e) {
              console.log(e);
            }
          },
        })
