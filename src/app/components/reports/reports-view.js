let highcharts = require('highcharts');
export class ReportsView {
  constructor() {
    this.template = require('./reports.hbs');
  }


  renderReports() {
    let mainContainer = document.getElementById('reports-render');
    mainContainer.innerHTML = this.template();
    let myChart = highcharts.chart('charts-container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      }, {
        name: 'John',
        data: [5, 7, 3]
      }]
    });
  }
}
