/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts/highcharts';

require('highcharts/modules/exporting')(Highcharts);


export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {}
    }
  }

  componentDidMount() {
    this._createChartLine('preview', this.state.options);
  }

  componentDidUpdate() {
    this._renderChart();
  }

  _createChartLine(container, options) {
    return Highcharts.chart(container, {
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
    });
  }

  _createChartColumn(container, options) {
    return Highcharts.chart(container, {
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
    });
  }

  _createChartPie(container, options) {
    return Highcharts.chart(container, {
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
      series: options.series
    });
  }

  _saveChart(chart, options) {
    let svgData = chart.getSVG();

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    // canvas.width = 750;
    // canvas.height = 530;
    var ctx = canvas.getContext('2d');

    var img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        window.open(canvas.toDataURL('image/png'));
        this.props.container.updateData({chartOptions: options});
        this.props.container.updateData({chartData: canvas.toDataURL('image/png')});
    }.bind(this);

    this.props.setStatePopin({
      applyChart: false
    });
  }

  _renderChartLine(options) {
    options.title = this.props.modelLine.title;
    options.subtitle = this.props.modelLine.subtitle;
    options.yAxisTitle = this.props.modelLine.yAxisTitle;
    options.pointStart = this.props.modelLine.pointStart;

    let series = [];

    this.props.modelLine.series.forEach(function (serie) {
      let newSerie = JSON.parse(JSON.stringify(serie));
      let name = newSerie.name;
      delete newSerie['name'];
      let itens = Object.values(newSerie).map(parseFloat);

      series.push({
        name: name,
        data: itens
      });
    })

    options.series = series;

    this._createChartLine('preview', options);

    if (this.props.applyChart) {
      let line = this._createChartLine('chart', options);
      this._saveChart(line, options);
    }    
  }

  _renderChartColumn(options) {
    options.title = this.props.modelColumn.title;
    options.subtitle = this.props.modelColumn.subtitle;
    options.yAxisTitle = this.props.modelColumn.yAxisTitle;

    let data = [];

    this.props.modelColumn.series.forEach(function (serie) {
      data.push([
        serie.legenda,
        parseFloat(serie.serie)
      ])
    })

    options.data = data;
    options.name = this.props.modelColumn.name;

    this._createChartColumn('preview', options);

    if (this.props.applyChart) {
      let column = this._createChartColumn('chart', options);
      this._saveChart(column, options);
    }
  }

  _renderChartPie(options) {
    options.title = this.props.modelPie.title;
    options.subtitle = this.props.modelPie.subtitle;

    let series = [{name: this.props.modelPie.name, data: []}];

    this.props.modelPie.series.forEach(function (serie) {
      let newSerie = JSON.parse(JSON.stringify(serie));
      let name = newSerie.name;
      delete newSerie['name'];

      series[0].data.push({
        name: name,
        y: parseFloat(newSerie.serie)
      });
    })

    options.series = series;

    this._createChartPie('preview', options);

    if (this.props.applyChart) {
      let pie = this._createChartPie('chart', options);
      this._saveChart(pie, options);
    }
  }

  _renderChart() {
    let options = this.state.options;
    let chartType = this.props.chartType;

    switch(chartType) {
      case 'line':
        this._renderChartLine(options);
        break;
      case 'column':
        this._renderChartColumn(options);
        break;
      case 'pie':
        this._renderChartPie(options);
        break;
    }
  }

  render() {
    return <div id="preview"></div>;
  }
}
