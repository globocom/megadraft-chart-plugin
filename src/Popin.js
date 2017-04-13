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
    this.chartType = 'line';
    this.modelLineChart = {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]};
    this.modelColumnChart = {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]};
    this.modelPieChart = {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]};

    this.state = {
      chartType: '',
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

  componentDidUpdate() {
    if (this.props.fire) {
      this.props.setStateBlock({
        fire: false
      });
    }
  }

  _teste() {
    let data = this.props.container.props.contentState.blockMap.toJSON()[this.props.chartID].data;
    let chartOptions = data.chartOptions && JSON.parse(data.chartOptions);

    this.modelLineChart = Object.assign({}, {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]});
    this.modelColumnChart = Object.assign({}, {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]});
    this.modelPieChart = Object.assign({}, {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]});

    if (this.props.fire) {
      // this.modelLineChart = {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]};
      // this.modelColumnChart = {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]};
      // this.modelPieChart = {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]};
      this.chartType = 'line';

      if (data.chartType) {
        this.chartType = data.chartType;
        if (data.chartType === 'line') {
          this.modelLineChart = Object.assign({}, chartOptions);
        }
        if (data.chartType === 'column') {
          this.modelColumnChart = Object.assign({}, chartOptions);
        }
        if (data.chartType === 'pie') {
          this.modelPieChart = Object.assign({}, chartOptions);
        }
      }
    } else {
      if (this.chartType === 'line') {
        this.modelLineChart = this.state.modelLineChart;
      }
      if (this.chartType === 'column') {
        this.modelColumnChart = this.state.modelColumnChart;
      }
      if (this.chartType === 'pie') {
        this.modelPieChart = this.state.modelPieChart;
      }
    }
  }

  setStatePopin = (dict) => {
    this.setState(dict);
  }

  _handleClose = () => {
    this.props.setStateBlock({
      popin: false
    });
  }

  _handleApplyChart = () => {
    this.bodyNode.scrollTop = 0;
    this.setState({
      applyChart: true
    });

    this.props.setStateBlock({
      popin: false
    });
  }

  _handleChartType(chartType) {
    this.chartType = chartType;
    this.setState({
      chartType: chartType
      // popin: true
    });
  }

  render() {
    this._teste();
    let teste = Object.assign({}, this.modelColumnChart);

    let chartTypeClass = function(type) {
      return classNames(
        'tab-' + type, {
        selected: type === this.chartType
      });
    }.bind(this);

    let popinClass = function() {
      return classNames(
        'popin', {
        active: this.props.popin
      });
    }.bind(this);

    return (
      <section ref="popin" className={popinClass()}>
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
                  key={"form-" + this.chartType + "-" + this.props.chartID}
                  modelLineChart={this.modelLineChart}
                  modelColumnChart={teste}
                  modelPieChart={this.modelPieChart}
                  chartID={this.props.chartID}
                  chartType={this.chartType}
                  setStatePopin={this.setStatePopin} />
              </div>
              <Chart
                key={"chart-" + this.chartType + "-" + this.props.chartID}
                modelLineChart={this.modelLineChart}
                modelColumnChart={teste}
                modelPieChart={this.modelPieChart}
                chartID={this.props.chartID}
                chartType={this.chartType}
                setStatePopin={this.setStatePopin}
                applyChart={this.state.applyChart}
                container={this.props.container} />
            </div>
          </div>
          <div className="footer">
            <button className="btn" onClick={this._handleClose}>fechar</button>
            <button className="btn" onClick={this._handleApplyChart}>aplicar</button>
          </div>
        </div>
      </section>
    );
  }
}
