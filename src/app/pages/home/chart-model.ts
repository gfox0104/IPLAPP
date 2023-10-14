export class ChartModel {
  chart = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          label: "Past Due",
          backgroundColor: [],
          data: []
        }
      ]
    },
    options: {
     
      responsive: false,
      title: {
        display: true,
        text: ''
      },
      legend: {
        display: false,
      },
      
    },
  }
}

export class StackBarChartModel {
  chart = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: ''
      },
      scales: {
        xAxes: [{
          barPercentage: 0.4,
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false //<- set this
          },
          ticks: {
            stepSize: 10000
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            autoSkipPadding: 5
          }
        }],
      }
    }
  }
}

export class StackHorizontalChartModel {
  chart = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: ''
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          barPercentage: 0.4,
          stacked: true,
        }],
      }
    },
  }
}

export class PieChartModel {
  chart = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          label: "Past Due",
          backgroundColor: ['#4473C3', '#F07C2E', '#A5A5A5', '#FABF02', '#5A9DD9'],
          data: []
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          align: function (context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            var invert = Math.abs(value) <= 1;
            return value < 1 ? 'end' : 'start'
          },
          anchor: 'end',
          color: '#000000',
          font: {
            size: 11,
            weight: 600
          },
          offset: 15,
          padding: 0,
        }
      },
      responsive: false,
      title: {
        display: true,
        text: ''
      },
      legend: {
        display: false,
      }
    },
  }
}

export class LineChartModel {
  chart = {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: ''
      },
      scales: {
        xAxes: [{
          barPercentage: 0.4,
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false //<- set this
          },
          ticks: {
            stepSize: 1
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            autoSkipPadding: 5
          }
        }],
      }
    }
  }
}