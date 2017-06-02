/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import Highcharts from "highcharts/highcharts";

require("highcharts/modules/exporting")(Highcharts);

import { CreateChartByType } from "./HighchartsConnector";

export default class Chart extends Component {
  componentDidMount() {
    this._renderChart();
  }

  componentDidUpdate() {
    this._renderChart();
  }

  _renderChart() {
    this.chart = CreateChartByType(
      this.props.type,
      this.props.id,
      this.props.themes.colors,
      this.props.data
    );
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.id}></div>
    );
  }
}
