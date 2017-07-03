/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

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
      this.props.theme.colors,
      this.props.data
    );
  }

  render() {
    const className = "chart-preview";
    return (
      <div className={className}>
        <div className={`${className}__header`}>
          <div className={`${className}__title`}>{ this.props.data.title }</div>
          <div className={`${className}__subtitle`}>{ this.props.data.subtitle }</div>
        </div>
        <div className={`${className}__highcharts`} id={this.props.id}></div>
        {
          (this.props.data.credits)
            ? <div className={`${className}__credits`}>{__("Credits")}: { this.props.data.credits }</div>
            : ""
        }
      </div>
    );
  }
}
