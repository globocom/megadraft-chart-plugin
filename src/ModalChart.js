/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";

import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import Tabs from "backstage-tabs";

import Chart from "./Chart";
import FormLine, {lineThemes, line} from "./FormLine";
import FormColumn, {columnThemes, column} from "./FormColumn";
import FormPie, {pieThemes, pie} from "./FormPie";

const FormByChartType = {
  line: FormLine,
  column: FormColumn,
  pie: FormPie
};

export default class ModalChart extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialChartState();

    this.onSaveRequest = ::this.onSaveRequest;
    this.setStateModal = ::this.setStateModal;

    this.tabs = [
      {
        value: "line",
        label: "Linha"
      },{
        value: "column",
        label: "Barra"
      },{
        value: "pie",
        label: "Pizza"
      }
    ];
  }

  getInitialChartState() {
    return {
      chartType: "line",
      line: {
        themes: lineThemes[this.props.tenant] || lineThemes.default,
        options: line
      },
      column: {
        themes: columnThemes[this.props.tenant] || lineThemes.default,
        options: column
      },
      pie: {
        themes: pieThemes[this.props.tenant] || lineThemes.default,
        options: pie
      }
    };
  }

  handleChartType(chartType) {
    this.setState({chartType});
  }

  componentWillReceiveProps() {
    let state = this.getInitialChartState();
    if (this.props.chart) {
      state[this.props.chart.type].options = this.props.chart.options;
      state[this.props.chart.type].themes = this.props.chart.themes;
      state.chartType = this.props.chart.type;
    }
    this.setState(state);
  }

  _encodeOptimizedSVGDataUri(svgString) {
    var uriPayload = encodeURIComponent(svgString.replace(/\n+/g, "")) // remove newlines and encode URL-unsafe characters
      .replace(/%20/g, " ") // put spaces back in
      .replace(/%3D/g, "=") // ditto equals signs
      .replace(/%3A/g, ":") // ditto colons
      .replace(/%2F/g, "/") // ditto slashes
      .replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)

    return uriPayload;
  }

  onSaveRequest() {
    let themes = this.state[this.state.chartType].themes;
    let options = this.state[this.state.chartType].options;
    let svgData = this._encodeOptimizedSVGDataUri(this.chartComponent.chart.getSVG());

    this.props.onSaveRequest({
      type: this.state.chartType,
      themes: themes,
      options: options,
      svg: svgData
    });
  }

  setStateModal(data) {
    let newState = {};
    newState[this.state.chartType] = data;
    this.setState(newState);
  }

  render() {
    let currentChartType = this.state.chartType;
    let FormComponent = FormByChartType[currentChartType];
    return (
      <Modal className="chart-modal"
             title="Gráfico"
             isOpen={this.props.isOpen}
             onCloseRequest={this.props.onCloseRequest}
             width="98%"
             height="96%">
        <ModalBody ref="body">
          <div className="chart-modal__form">
            <Tabs
              tabs={this.tabs} activeTab={currentChartType}
              onClickTab={clickedTab => this.handleChartType(clickedTab.value)}
            />
            <FormComponent
              key={"form-" + currentChartType + "-" + this.props.chartID}
              model={this.state[currentChartType]}
              chartID={this.props.chartID}
              chartType={currentChartType}
              setStateModal={this.setStateModal} />
          </div>
          <div className="chart-modal__chart">
            <Chart
              id="chart-modal__preview"
              key={"chart-" + currentChartType + "-" + this.props.chartID}
              ref={(chartComponent) => {this.chartComponent = chartComponent;}}
              themes={this.state[currentChartType].themes}
              data={this.state[currentChartType].options}
              type={currentChartType} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="chart-add-button bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
            onClick={this.onSaveRequest}>aplicar</button>
        </ModalFooter>
      </Modal>
    );
  }
}
