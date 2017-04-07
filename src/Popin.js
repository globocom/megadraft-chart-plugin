/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import classNames from "classnames";
import Form from './Form';
import Chart from './Chart';

export default class Popin extends Component {
  constructor(props) {
    super(props);
    this.bodyNode;
    this.contentHeight = {};

    this.state = {
      chartType: 'line',
      applyChart: false,

      modelLineChart: {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]},
      modelColumnChart: {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]},
      modelPieChart: {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]}
    }
  }

  componentDidMount() {
    this.bodyNode = ReactDOM.findDOMNode(this.refs['body']);
    this.contentHeight = {minHeight: (this.bodyNode.clientHeight - 40) + 'px'};
  }

  setStatePopin = (dict) => {
    this.setState(dict);
  }

  _handleApplyChart() {
    this.bodyNode.scrollTop = 0;
    this.setState({
      applyChart: true
    });

    this.props.setStateBlock({
      popin: false,
    });
  }

  _handleChartType(chartType) {
    this.setState({
      chartType: chartType
    });
  }

  render() {
    let chartTypeClass = function(type) {
      return classNames(
        'tab-' + type, {
        selected: type === this.state.chartType
      });
    }.bind(this);

    let popinClass = function() {
      return classNames(
        'popin', {
        active: this.props.popin
      });
    }.bind(this);

    return (
      <section className={popinClass()}>
        <div className="block">
          <div className="header with-tabs">
            <a className="popin-close"></a>
            <ul className="nav nav-tabs">
                <li className={chartTypeClass('line')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('line')}>Linha</a>
                </li>
                <li className={chartTypeClass('column')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('column')}>Barra</a>
                </li>
                <li className={chartTypeClass('pie')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('pie')}>Pizza</a>
                </li>
            </ul>
          </div>
          <div ref="body" className="body list-body">
            <div className="grid">
              <div className="form" style={this.contentHeight}>
                <Form
                  key={"form" + this.state.chartType}
                  modelLineChart={this.state.modelLineChart}
                  modelColumnChart={this.state.modelColumnChart}
                  modelPieChart={this.state.modelPieChart}
                  chartType={this.state.chartType}
                  setStatePopin={this.setStatePopin} />
              </div>
              <Chart
                key={"chart-" + this.state.chartType}
                modelLineChart={this.state.modelLineChart}
                modelColumnChart={this.state.modelColumnChart}
                modelPieChart={this.state.modelPieChart}
                chartType={this.state.chartType}
                setStatePopin={this.setStatePopin}
                applyChart={this.state.applyChart}
                container={this.props.container} />
            </div>
          </div>
          <div className="footer">
            <button className="btn" onClick={() => this._handleApplyChart()}>aplicar</button>
          </div>
        </div>
      </section>
    );
  }
}
