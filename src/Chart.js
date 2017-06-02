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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._renderChart();
  }

  componentDidUpdate() {
    this._renderChart();
  }
  _renderChart() {
    CreateChartByType(
      this.props.chartType,
      "chart-modal__preview",
      this.props.themes.colors,
      this.props.model
    );
  }

  render() {
    return <div className="chart-modal__chart-preview" id="chart-modal__preview"></div>;
  }
}
