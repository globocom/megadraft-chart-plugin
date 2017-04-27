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
import FormLine, {lineColors, line} from './FormLine';
import FormColumn, {columnColors, column} from './FormColumn';
import FormPie, {pieColors, pie} from './FormPie';


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

      lineColors: lineColors,
      columnColors: columnColors,
      pieColors: pieColors,

      line: line,
      column: column,
      pie: pie,

      model: {
        line: {
          label: "linha",
          colors: [],
          options: {}
        },
        column: {
          label: "barra",
          colors: [],
          options: {}
        },
        pie: {
          label: "pizza",
          colors: [],
          options: {}
        }
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

    this.state.model['line']['colors'] = this.state.lineColors;
    this.state.model['line']['options'] = this.state.line;
    this.state.model['column']['colors'] = this.state.columnColors;
    this.state.model['column']['options'] = this.state.column;
    this.state.model['pie']['colors'] = this.state.pieColors;
    this.state.model['pie']['options'] = this.state.pie;

    if (!this.props.isOpen) return;
    if (!this.state.isFirstEditing || !chart) return;

    this.state.chartType = chart.type;
    this.state[this.state.chartType] = Object.assign({}, chart.options);
    this.state.model[this.state.chartType]['colors'] = Object.assign({}, chart.colors);
    this.state.model[this.state.chartType]['options'] = Object.assign({}, chart.options);
  }

  _onCloseRequest = () => {
    this.setState({
      isFirstEditing: true
    });
    this.props.onCloseRequest();
  }

  _onSaveRequest = () => {
    let colors = this.state.model[this.state.chartType]['colors'];
    let options = this.state.model[this.state.chartType]['options'];
    let image;


    let svgData = this.chartComponent.state.chart.getSVG();
    let canvas = document.createElement('canvas');
    let img = document.createElement('img');
    let ctx;

    canvas.width = 1024;
    canvas.height = 768;

    ctx = canvas.getContext('2d');

    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      // window.open(canvas.toDataURL('image/png'));
      image = canvas.toDataURL('image/png');

      this.props.onSaveRequest({
        type: this.state.chartType,
        colors: colors,
        options: options,
        image: image
      });
    }
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
              {Object.keys(this.state.model).map(function(type) {
                return <button
                  key={"button-" + type}
                  className={menuClass(type)}
                  onClick={(chartType) => this._handleChartType(type)}>
                  {this.state.model[type].label}</button>
              }, this)}
            </div>
            <div className="form">
              <FormComponent
                key={"form-" + this.state.chartType + "-" + this.props.chartID}
                colors={this.state.model[this.state.chartType]['colors']}
                model={this.state.model[this.state.chartType]['options']}
                chartID={this.props.chartID}
                setStateModal={this.setStateModal} />
            </div>
            <div className="separator"></div>
            <div className="chart">
              <Chart
                key={"chart-" + this.state.chartType + "-" + this.props.chartID}
                ref={(chartComponent) => {this.chartComponent = chartComponent}}
                colors={this.state.model[this.state.chartType]['colors']}
                model={this.state.model[this.state.chartType]['options']}
                connector="highcharts"
                chartType={this.state.chartType} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bs-ui-button bs-ui-button--blue bs-ui-button--small"
            onClick={this._onCloseRequest}>fechar</button>
          <button
            className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
            onClick={this._onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
