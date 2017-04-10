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
      modelLineChart: this.props.modelLineChart,
      modelColumnChart: this.props.modelColumnChart,
      modelPieChart: this.props.modelPieChart
    };
  }

  componentDidMount() {
    this._renderChart();
  }

  componentDidUpdate() {
    this._renderChart();
  }

  _getChartType() {
    let chartType = {
      line: {
        model: this.props.modelLineChart,
        render: this._renderLineChart,
        create: this._createChartLine
      },
      column: {
        model: this.props.modelColumnChart,
        render: this._renderColumnChart,
        create: this._createChartColumn
      },
      pie: {
        model: this.props.modelPieChart,
        render: this._renderPieChart,
        create: this._createChartPie
      }
    };

    return chartType[this.props.chartType];
  }

  _currentModel = () => {
    return this._getChartType().model;
  }

  _currentRender = () => {
    return this._getChartType().render;
  }

  _currentCreate = () => {
    return this._getChartType().create;
  }

  _chartLine(options) {
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

  _chartColumn(options) {
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

  _chartPie(options) {
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

  _createChartLine(container, options) {
    return Highcharts.chart(container, this._chartLine(options));
  }

  _createChartColumn(container, options) {
    return Highcharts.chart(container, this._chartColumn(options));
  }

  _createChartPie(container, options) {
    return Highcharts.chart(container, this._chartPie(options));
  }

  _saveChart = (chart, options, optionsShow) => {
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
        // window.open(canvas.toDataURL('image/png'));
        this.props.container.updateData({chartType: this.props.chartType});
        this.props.container.updateData({chartOptions: JSON.stringify(options)});
        this.props.container.updateData({chartOptionsShow: JSON.stringify(optionsShow)});
        this.props.container.updateData({chartData: canvas.toDataURL('image/png')});
    }.bind(this);

    this.props.setStatePopin({
      applyChart: false
    });
  }

  _renderLineChart = (options) => {
    let modelChartLine = Object.assign({}, this.props.modelLineChart);

    options.title = modelChartLine.title;
    options.subtitle = modelChartLine.subtitle;
    options.yAxisTitle = modelChartLine.yAxisTitle;
    options.pointStart = parseFloat(modelChartLine.pointStart);

    let series = [];
    let points = modelChartLine.series || [];

    points.forEach(function (serie) {
      let newSerie = JSON.parse(JSON.stringify(serie));
      let name = newSerie.name;
      delete newSerie['name'];
      let itens = Object.values(newSerie.data).map(function(value) {
        return parseFloat(Number(value))
      });

      series.push({
        name: name,
        data: itens
      });
    })

    options.series = series;

    this._createChartLine('preview', options);

    if (this.props.applyChart) {
      let line = this._createChartLine('chart', options);
      this._saveChart(line, options, this._chartLine(options));
    }    
  }

  _renderColumnChart = (options) => {
    let modelChartColumn = this.props.modelColumnChart;

    options.title = modelChartColumn.title;
    options.subtitle = modelChartColumn.subtitle;
    options.yAxisTitle = modelChartColumn.yAxisTitle;
    options.name = modelChartColumn.nameColumn;
    options.data = modelChartColumn.data;

    this._createChartColumn('preview', options);

    if (this.props.applyChart) {
      let column = this._createChartColumn('chart', options);
      this._saveChart(column, options, this._chartColumn(options));
    }
  }

  _renderPieChart = (options) => {
    let modelChartPie = this.props.modelPieChart;

    options.title = modelChartPie.title;
    options.subtitle = modelChartPie.subtitle;
    options.name = modelChartPie.namePie;
    options.data = modelChartPie.data;

    this._createChartPie('preview', options);

    if (this.props.applyChart) {
      let pie = this._createChartPie('chart', options);
      this._saveChart(pie, options, this._chartPie(options));
    }
  }

  _renderChart = () => {
    let render = this._currentRender();
    return render(this._currentModel());
  }

  render() {
    return <div id="preview"></div>;
  }
}
