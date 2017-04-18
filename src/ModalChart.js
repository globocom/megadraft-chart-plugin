/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';

import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import classNames from "classnames";

import Form from './Form';
import Chart from './Chart';
import {
  CreateChartLine,
  CreateChartColumn,
  CreateChartPie
} from "./ChartConnector";


export default class ModalChart extends Component {

  static propTypes = {
    onCloseRequest: PropTypes.func,
    onSaveRequest: PropTypes.func
  }

  constructor(props) {
    super(props);

    this._onSaveRequest = ::this._onSaveRequest;

    this.chartType = 'line';
    this.modelLineChart = {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]};
    this.modelColumnChart = {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]};
    this.modelPieChart = {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]};

    this.state = {
      chartType: 'line',

      modelLineChart: {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}]},
      modelColumnChart: {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]]},
      modelPieChart: {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}]},

      // data: {
      //   title: "",
      //   source: "",
      //   headerStyle: {
      //     top: false,
      //     bottom: false,
      //     right: false,
      //     left: false
      //   },
      //   rows: [[], []]
      // },
      // errors: {
      //   title: []
      // }
    };
  }

  _handleChartType = (chartType) => {
    let state = {chartType: chartType};

    this.props.setStateChartBlock({
      isFirstEditing: false
    });

    if (this.chartType === 'line') {
      state["modelLineChart"] = this.modelLineChart;
    }
    if (this.chartType === 'column') {
      state["modelColumnChart"] = this.modelColumnChart;
    }
    if (this.chartType === 'pie') {
      state["modelPieChart"] = this.modelPieChart;
    }

    this.setState(state);
  }

  _setCurrentData() {
    let chart = this.props.chart;

    if (!this.props.isOpen) return;

    this.modelLineChart = this.state.modelLineChart;
    this.modelColumnChart = this.state.modelColumnChart;
    this.modelPieChart = this.state.modelPieChart;

    this.chartType = this.state.chartType;
    if (!chart) return;

    if (!this.props.isFirstEditing) return;
    this.chartType = chart.type;

    if (this.chartType === 'line') {
      this.modelLineChart = Object.assign({}, chart.options);
    }
    if (this.chartType === 'column') {
      this.modelColumnChart = Object.assign({}, chart.options);
    }
    if (this.chartType === 'pie') {
      this.modelPieChart = Object.assign({}, chart.options);
    }
  }

  _onSaveRequest() {
    // let options = this.modelLineChart;
    let options;
    if (this.chartType === 'line') {
      options = this.modelLineChart;
      CreateChartLine('chart-' + this.props.chartID, options);
    }
    if (this.chartType === 'column') {
      options = this.modelColumnChart;
      CreateChartColumn('chart-' + this.props.chartID, options);
    }
    if (this.chartType === 'pie') {
      options = this.modelPieChart;
      CreateChartPie('chart-' + this.props.chartID, options);
    }
    let chart = {
      type: this.chartType,
      options: options
    }

    // CreateChartLine('chart-' + this.props.chartID, options);
    this.props.onSaveRequest({chart});
  }

  setStateModal = (dict) => {
    this.setState(dict);
  }

  render() {
    this._setCurrentData();

    let menuClass = function(type) {
      return classNames(
        'bs-ui-button', {
        'bs-ui-button--blue': this.chartType === type
      });
    }.bind(this);

    return (
      <Modal className="chart-modal"
             title="Chart"
             isOpen={this.props.isOpen}
             onCloseRequest={this.props.onCloseRequest}
             width="98%"
             height="96%">
        <ModalBody ref="body" >
          <div className="grid">
            <div className="menu">
              <button
                className={menuClass('line')}
                onClick={(chartType) => this._handleChartType('line')}>linha</button>
              <button
                className={menuClass('column')}
                onClick={(chartType) => this._handleChartType('column')}>barra</button>
              <button
                className={menuClass('pie')}
                onClick={(chartType) => this._handleChartType('pie')}>pizza</button>
            </div>
            <div className="form">
              <Form
                key={"form-" + this.chartType + "-" + this.props.chartID}
                modelLineChart={this.modelLineChart}
                modelColumnChart={this.modelColumnChart}
                modelPieChart={this.modelPieChart}
                chartID={this.props.chartID}
                chartType={this.chartType}
                setStateModal={this.setStateModal}
                setStateChartBlock={this.props.setStateChartBlock} />
            </div>
            <div className="separator"></div>
            <div className="chart">
              <Chart
                key={"chart-" + this.chartType + "-" + this.props.chartID}
                modelLineChart={this.modelLineChart}
                modelColumnChart={this.modelColumnChart}
                modelPieChart={this.modelPieChart}
                chartType={this.chartType} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bs-ui-button bs-ui-button--background-black bs-ui-button--small"
            onClick={this.props.onCloseRequest}>fechar</button>
          <button
            className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
            onClick={this._onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
