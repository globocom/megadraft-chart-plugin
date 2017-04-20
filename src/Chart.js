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
  CreateBasicLine,
  CreateSimpleColumn,
  CreatePieChart
} from "./HighchartsConnector";


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
        create: CreateBasicLine
      },
      column: {
        model: this.props.modelColumnChart,
        render: this._renderColumnChart,
        create: CreateSimpleColumn
      },
      pie: {
        model: this.props.modelPieChart,
        render: this._renderPieChart,
        create: CreatePieChart
      }
    };

    return chartType[this.props.chartType];
  }

  // _currentModel = () => {
  //   return this._getChartType().model;
  // }

  _currentRender = () => {
    return this._getChartType().render;
  }

  _currentCreate = () => {
    return this._getChartType().create;
  }

  _renderLineChart = () => {
    let modelBasicLine = this.props.modelLineChart;

    let series = [];
    let points = modelBasicLine.series || [];

    points.forEach(function (serie) {
      let newSerie = JSON.parse(JSON.stringify(serie));
      let name = newSerie.name;
      // delete newSerie['name'];
      let itens = Object.values(newSerie.data).map(function(value) {
        return parseFloat(Number(value))
      });

      series.push({
        name: name,
        data: itens
      });
    })

    modelBasicLine.series = series;

    CreateBasicLine('preview', Object.assign({}, modelBasicLine));
  }

  _renderColumnChart = () => {
    let modelSimpleColumn = this.props.modelColumnChart;

    CreateSimpleColumn('preview', Object.assign({}, modelSimpleColumn));
  }

  _renderPieChart = () => {
    let modelPieChart = this.props.modelPieChart;

    CreatePieChart('preview', Object.assign({}, modelPieChart));
  }

  _renderChart = () => {
    let render = this._currentRender();
    return render();
  }

  render() {
    return <div id="preview"></div>;
  }
}
