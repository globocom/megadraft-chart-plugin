/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import Highcharts from 'highcharts/highcharts';

require('highcharts/modules/exporting')(Highcharts);


export function ChartLine(options) {
  return {
    exporting: {
      allowHTML: true,
      enabled: false,
      sourceWidth: 640,
      sourceHeight: 480
    },
    credits: {
      enabled: false
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    title: {
      text: options.title
    },
    subtitle: {
      text: options.subtitle
    },
    yAxis: {
      title: {
          text: options.yAxisTitle
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
          pointStart: options.pointStart
      }
    },
    series: options.series
  }
}

export function ChartColumn(options) {
  return {
    exporting: {
      allowHTML: true,
      enabled: false,
      sourceWidth: 640,
      sourceHeight: 480
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: false
    },
    chart: {
        type: 'column'
    },
    title: {
      text: options.title
    },
    subtitle: {
      text: options.subtitle
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: options.yAxisTitle
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: options.name + ' <b>{point.y:.1f}</b>'
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  }
}

export function ChartPie(options) {
  return {
    exporting: {
      allowHTML: true,
      enabled: false,
      sourceWidth: 640,
      sourceHeight: 480
      // scale: 2 (default)
      // chartOptions: {
      //   subtitle: null
      // }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: options.title
    },
    subtitle: {
      text: options.subtitle
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data
    }]
  }
}

export function CreateChartLine(container, options) {
  Highcharts.theme = {
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee']
  };
  Highcharts.setOptions(Highcharts.theme);

  return Highcharts.chart(container, ChartLine(options));
}

export function CreateChartColumn(container, options) {
  Highcharts.theme = {
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee']
  };
  Highcharts.setOptions(Highcharts.theme);

  return Highcharts.chart(container, ChartColumn(options));
}

export function CreateChartPie(container, options) {
  Highcharts.theme = {
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee']
  };
  Highcharts.setOptions(Highcharts.theme);

  return Highcharts.chart(container, ChartPie(options));
}

// export function SaveChart(chart, options, optionsShow) {
//   let svgData = chart.getSVG();

//   var canvas = document.createElement('canvas');
//   canvas.width = 640;
//   canvas.height = 480;
//   // canvas.width = 750;
//   // canvas.height = 530;
//   var ctx = canvas.getContext('2d');

//   var img = document.createElement('img');
//   img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
//   img.onload = function() {
//       ctx.drawImage(img, 0, 0);
//       // window.open(canvas.toDataURL('image/png'));
//       this.props.container.updateData({chartType: this.props.chartType});
//       this.props.container.updateData({chartOptions: JSON.stringify(options)});
//       // this.props.container.updateData({chartOptionsShow: JSON.stringify(optionsShow)});
//       // this.props.container.updateData({chartData: canvas.toDataURL('image/png')});
//   }.bind(this);
// }
