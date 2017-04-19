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


export default class ModalChart extends Component {

  static propTypes = {
    onCloseRequest: PropTypes.func,
    onSaveRequest: PropTypes.func
  }

  constructor(props) {
    super(props);

    this._onSaveRequest = ::this._onSaveRequest;

    this.state = {
      chartType: 'line',
      isFirstEditing: true,

      modelLineChart: {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{name: "", data: [null, null, null]}], colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]},
      modelColumnChart: {title: "", subtitle: "", yAxisTitle: "", nameColumn: "", data: [["", null]], colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]},
      modelPieChart: {title: "", subtitle: "", namePie: "", data: [{name: "", y: null}], colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]},
    };
  }

  _handleChartType = (chartType) => {
    this.setState({
      chartType: chartType,
      isFirstEditing: false
    });
  }

  _setCurrentData() {
    let chart = this.props.chart;

    if (!this.props.isOpen) return;

    if (this.state.isFirstEditing && chart) {
      if (chart.type === 'line') {
        this.state.modelLineChart = Object.assign({}, chart.options);
      }
      if (chart.type === 'column') {
        this.state.modelColumnChart = Object.assign({}, chart.options);
      }
      if (chart.type === 'pie') {
        this.state.modelPieChart = Object.assign({}, chart.options);
      }
      this.state.chartType = chart.type;
    }
  }

  _onSaveRequest() {
    let options;

    if (this.state.chartType === 'line') {
      options = this.state.modelLineChart;
    }
    if (this.state.chartType === 'column') {
      options = this.state.modelColumnChart;
    }
    if (this.state.chartType === 'pie') {
      options = this.state.modelPieChart;
    }

    this.props.onSaveRequest({
      type: this.state.chartType,
      options: options
    });
  }

  setStateModal = (dict) => {
    this.setState(dict);
  }

  render() {
    this._setCurrentData();

    let menuClass = function(type) {
      return classNames(
        'bs-ui-button', {
        'bs-ui-button--blue': this.state.chartType === type
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
                key={"form-" + this.state.chartType + "-" + this.props.chartID}
                modelLineChart={this.state.modelLineChart}
                modelColumnChart={this.state.modelColumnChart}
                modelPieChart={this.state.modelPieChart}
                chartID={this.props.chartID}
                chartType={this.state.chartType}
                setStateModal={this.setStateModal}
                 />
            </div>
            <div className="separator"></div>
            <div className="chart">
              <Chart
                key={"chart-" + this.state.chartType + "-" + this.props.chartID}
                modelLineChart={this.state.modelLineChart}
                modelColumnChart={this.state.modelColumnChart}
                modelPieChart={this.state.modelPieChart}
                chartType={this.state.chartType} />
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
