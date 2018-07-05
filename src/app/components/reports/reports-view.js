let highcharts = require('highcharts');

export class ReportsView {
  constructor() {
    this.template = require('./reports.hbs');
  }

  renderReports(data) {
    let mainContainer = document.getElementById('reports-render');
    mainContainer.innerHTML = this.template();
    this.renderDayReports(data.dayTasks);
    this.renderWeekReports(data.weekTasks);
    this.renderMonthReports(data.monthTasks);
  }

  renderDayReports(data) {
    let myChart = highcharts.chart('day-container', {
      chart: {
        type: 'column'
      },
      categories: {
        crosshair: true
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: [
          'Urgent',
          'High',
          'Middle',
          'Low',
          'Failed'
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        pointFormat: 'Pomodoros: <b>{point.y:.1f}</b>'
      },
      series: [
        {
          name: 'Urgent',
          data: [data['4']]
        },
        {
          name: 'High',
          data: [data['3']]
        },
        {
          name: 'Middle',
          data: [data['2']]
        },
        {
          name: 'Low',
          data: [data['1']]
        },
        {
          name: 'Failed',
          data: [data.failed]
        }
      ]
    });
  }

  renderWeekReports(data) {
    let myChart = highcharts.chart('week-container', {
      chart: {
        type: 'column'
      },
      categories: {
        crosshair: true
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: [
          'Urgent',
          'High',
          'Middle',
          'Low',
          'Failed'
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        pointFormat: 'Pomodoros: <b>{point.y:.1f}</b>'
      },
      series: [
        {
          name: 'Urgent',
          data: [data['4']]
        },
        {
          name: 'High',
          data: [data['3']]
        },
        {
          name: 'Middle',
          data: [data['2']]
        },
        {
          name: 'Low',
          data: [data['1']]
        },
        {
          name: 'Failed',
          data: [data.failed]
        }
      ]
    });
  }

  renderMonthReports(data) {
    let myChart = highcharts.chart('month-container', {
      chart: {
        type: 'column'
      },
      categories: {
        crosshair: true
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories: [
          'Urgent',
          'High',
          'Middle',
          'Low',
          'Failed'
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        pointFormat: 'Pomodoros: <b>{point.y:.1f}</b>'
      },
      series: [
        {
          name: 'Urgent',
          data: [data['4']]
        },
        {
          name: 'High',
          data: [data['3']]
        },
        {
          name: 'Middle',
          data: [data['2']]
        },
        {
          name: 'Low',
          data: [data['1']]
        },
        {
          name: 'Failed',
          data: [data.failed]
        }
      ]
    });
  }
}
