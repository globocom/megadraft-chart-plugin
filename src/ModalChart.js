/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';

import Modal, {ModalBody, ModalFooter} from "backstage-modal";

import Form from './Form';
import Chart from './Chart';
import {
  CreateChartLine
} from "./ChartHelper";


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
      chartType: '',

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

  _setCurrentData() {
    let chart = this.props.chart;

    if (!this.props.isOpen) return;

    this.chartType = 'line';
    this.modelLineChart = this.state.modelLineChart;
    this.modelColumnChart = this.state.modelColumnChart;
    this.modelPieChart = this.state.modelPieChart;

    if (!this.props.isFirstEditing) return;
    if (!chart) return;

    if (chart.type === 'line') {
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
    let options = this.modelLineChart;
    let chart = {
      type: this.chartType,
      options: options
    }

    CreateChartLine('chart-' + this.props.chartID, options);
    this.props.onSaveRequest({chart});
  }

  setStateModal = (dict) => {
    this.setState(dict);
  }

  render() {
    this._setCurrentData();

    return (
      <Modal className="table-manager-modal"
             title="Chart"
             isOpen={this.props.isOpen}
             onCloseRequest={this.props.onCloseRequest}
             width="98%"
             height="96%">
        <ModalBody ref="body" >
          <div className="grid">
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
        <ModalFooter className="table-manager-modal__footer">
          <button className="btn" onClick={this.props.onCloseRequest}>fechar</button>
          <button className="btn" onClick={this._onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
