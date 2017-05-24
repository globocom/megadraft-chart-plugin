/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component, PropTypes} from "react";

import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import Tabs from "backstage-tabs";

import Chart from "./Chart";
import FormLine, {lineThemes, line} from "./FormLine";
import FormColumn, {columnThemes, column} from "./FormColumn";
import FormPie, {pieThemes, pie} from "./FormPie";


export default class ModalChart extends Component {

  static propTypes = {
    onCloseRequest: PropTypes.func,
    onSaveRequest: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      isFirstEditing: true,

      lineThemes: lineThemes[this.props.tenant] || lineThemes["default"],
      columnThemes: columnThemes[this.props.tenant] || lineThemes["default"],
      pieThemes: pieThemes[this.props.tenant] || lineThemes["default"],

      line: line,
      column: column,
      pie: pie
    };

    this.chartType = "line";

    this.model = {
      line: {
        label: "linha",
        themes: [],
        options: {}
      },
      column: {
        label: "barra",
        themes: [],
        options: {}
      },
      pie: {
        label: "pizza",
        themes: [],
        options: {}
      }
    };

    this.tabs = Object.keys(this.model).map((key, index) => {
      return {
        value: key,
        label: this.model[key].label
      };
    });
  }

  _currentComponent = () => {
    let components = {
      line: FormLine,
      column: FormColumn,
      pie: FormPie
    };

    return components[this.chartType];
  }

  _handleChartType = (chartType) => {
    this.chartType = chartType;
    this.setState({
      isFirstEditing: false,
      line: this.model["line"]["options"],
      column: this.model["column"]["options"],
      pie: this.model["pie"]["options"]
    });
  }

  _loadDataBySource() {
    let chart = this.props.chart;

    this.model["line"]["themes"] = this.state.lineThemes;
    this.model["line"]["options"] = this.state.line;
    this.model["column"]["themes"] = this.state.columnThemes;
    this.model["column"]["options"] = this.state.column;
    this.model["pie"]["themes"] = this.state.pieThemes;
    this.model["pie"]["options"] = this.state.pie;

    if (!this.props.isOpen || !this.state.isFirstEditing) {
      return;
    }

    if (this.props.isButton) {
      this.model["line"]["themes"] = lineThemes[this.props.tenant] || lineThemes["default"];
      this.model["line"]["options"] = line;
      this.model["column"]["themes"] = columnThemes[this.props.tenant] || lineThemes["default"];
      this.model["column"]["options"] = column;
      this.model["pie"]["themes"] = pieThemes[this.props.tenant] || lineThemes["default"];
      this.model["pie"]["options"] = pie;
    }

    if (!chart) {
      return;
    }

    this.chartType = chart.type;
    this.model[this.chartType]["themes"] = Object.assign({}, chart.themes);
    this.model[this.chartType]["options"] = Object.assign({}, chart.options);
  }

  _onCloseRequest = () => {
    this.setState({
      isFirstEditing: true
    });
    this.props.onCloseRequest();
  }

  _safeTags = (str) => {
    return str.replace("\"","&quot;");
  }

  _onSaveRequest = () => {
    let themes = this.model[this.chartType]["themes"];
    let options = this.model[this.chartType]["options"];
    let headerSVG = '<?xml version="1.0" encoding="utf-8"?>' +
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    // let svgData = headerSVG + this.chartComponent.chart.getSVG();
    // svgData = this._safeTags(svgData);
    let svgData = encodeURI(this.chartComponent.chart.getSVG());

    this.props.onSaveRequest({
      type: this.chartType,
      themes: themes,
      options: options,
      svg: svgData
    });
  }

  setStateModal = (data) => {
    this.setState({...data, isFirstEditing: false});
  }

  render() {
    let FormComponent;
    this._loadDataBySource();
    FormComponent = this._currentComponent();
    return (
      <Modal className="chart-modal"
             title="Gráfico"
             isOpen={this.props.isOpen}
             onCloseRequest={this._onCloseRequest}
             width="98%"
             height="96%">
        <ModalBody ref="body">
          <div className="chart-modal__form">
            <Tabs
              tabs={this.tabs} activeTab={this.chartType}
              onClickTab={clickedTab => this._handleChartType(clickedTab.value)}
            />
            <FormComponent
              key={"form-" + this.chartType + "-" + this.props.chartID}
              themes={this.model[this.chartType]["themes"]}
              model={this.model[this.chartType]["options"]}
              chartID={this.props.chartID}
              chartType={this.chartType}
              setStateModal={this.setStateModal} />
          </div>
          <div className="chart-modal__chart">
            <Chart
              key={"chart-" + this.chartType + "-" + this.props.chartID}
              ref={(chartComponent) => {this.chartComponent = chartComponent;}}
              themes={this.model[this.chartType]["themes"]}
              model={this.model[this.chartType]["options"]}
              connector="highcharts"
              chartType={this.chartType} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="chart-add-button bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
            onClick={this._onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
