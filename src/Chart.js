/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts/highcharts';

require('highcharts/modules/exporting')(Highcharts);

import {
  ChartLine,
  ChartColumn,
  ChartPie,
  CreateChartLine,
  CreateChartColumn,
  CreateChartPie
} from "./ChartConnector";


export default class Chart extends Component {
  constructor(props) {
    super(props);
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
        create: CreateChartLine
      },
      column: {
        model: this.props.modelColumnChart,
        render: this._renderColumnChart,
        create: CreateChartColumn
      },
      pie: {
        model: this.props.modelPieChart,
        render: this._renderPieChart,
        create: CreateChartPie
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

  _renderLineChart = (options) => {
    let modelChartLine = this.props.modelLineChart;

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

    CreateChartLine('preview', Object.assign({}, options));
  }

  _renderColumnChart = (options) => {
    let modelChartColumn = this.props.modelColumnChart;

    options.title = modelChartColumn.title;
    options.subtitle = modelChartColumn.subtitle;
    options.yAxisTitle = modelChartColumn.yAxisTitle;
    options.name = modelChartColumn.nameColumn;
    options.data = modelChartColumn.data;

    CreateChartColumn('preview', Object.assign({}, options));
  }

  _renderPieChart = (options) => {
    let modelChartPie = this.props.modelPieChart;

    options.title = modelChartPie.title;
    options.subtitle = modelChartPie.subtitle;
    options.name = modelChartPie.namePie;
    options.data = modelChartPie.data;

    CreateChartPie('preview', Object.assign({}, options));
  }

  _renderChart = () => {
    let render = this._currentRender();
    return render(this._currentModel());
  }

  render() {
    return <div id="preview"></div>;
  }
}
