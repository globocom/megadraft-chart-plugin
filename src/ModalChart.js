/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';

import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import classNames from "classnames";

import Chart from './Chart';
import FormLine from './FormLine';
import FormColumn from './FormColumn';
import FormPie from './FormPie';


export default class ModalChart extends Component {

  static propTypes = {
    onCloseRequest: PropTypes.func,
    onSaveRequest: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      chartType: 'line',
      isFirstEditing: true,

      colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],

      line: {title: "", subtitle: "", yAxisTitle: "", pointStart: 0, pointSize: 3, series: [{color: "#f45b5b", name: "", data: [null, null, null]}]},
      column: {title: "", subtitle: "", yAxisTitle: "", name: "", data: [["", null]], colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]},
      pie: {title: "", subtitle: "", name: "", data: [{name: "", y: null}], colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]},

      model: {
        line: {},
        column: {},
        pie: {}
      }
    };
  }

  _currentComponent = () => {
    let components = {
      line: FormLine,
      column: FormColumn,
      pie: FormPie
    };

    return components[this.state.chartType];
  }

  _handleChartType = (chartType) => {
    this.setState({
      chartType: chartType,
      isFirstEditing: false
    });
  }

  _loadDataBySource() {
    let chart = this.props.chart;

    this.state.model['line'] = this.state.line;
    this.state.model['column'] = this.state.column;
    this.state.model['pie'] = this.state.pie;

    if (!this.props.isOpen) return;
    if (!this.state.isFirstEditing || !chart) return;

    this.state.chartType = chart.type;
    this.state[this.state.chartType] = Object.assign({}, chart.options);
    this.state.model[this.state.chartType] = Object.assign({}, chart.options);
  }

  _onCloseRequest = () => {
    this.setState({
      isFirstEditing: true
    });
    this.props.onCloseRequest();
  }

  _onSaveRequest = () => {
    let options;

    options = this.state.model[this.state.chartType];

    this.props.onSaveRequest({
      type: this.state.chartType,
      options: options
    });
  }

  setStateModal = (dict) => {
    this.setState(dict);
  }

  render() {
    let FormComponent;
    let menuClass;

    this._loadDataBySource();

    FormComponent = this._currentComponent();

    menuClass = function(type) {
      return classNames(
        'bs-ui-button', {
        'bs-ui-button--blue': this.state.chartType === type
      });
    }.bind(this);

    return (
      <Modal className="chart-modal"
             title="Chart"
             isOpen={this.props.isOpen}
             onCloseRequest={this._onCloseRequest}
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
              <FormComponent
                key={"form-" + this.state.chartType + "-" + this.props.chartID}
                model={this.state.model[this.state.chartType]}
                colors={this.state.colors}
                chartID={this.props.chartID}
                setStateModal={this.setStateModal} />
            </div>
            <div className="separator"></div>
            <div className="chart">
              <Chart
                key={"chart-" + this.state.chartType + "-" + this.props.chartID}
                model={this.state.model[this.state.chartType]}
                connector="highcharts"
                chartType={this.state.chartType} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bs-ui-button bs-ui-button--background-black bs-ui-button--small"
            onClick={this._onCloseRequest}>fechar</button>
          <button
            className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
            onClick={this._onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
