/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";

import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import Tabs from "backstage-tabs";

import Chart from "./Chart";
import FormLine, {lineInitial} from "./FormLine";
import FormColumn, {columnInitial} from "./FormColumn";
import FormPie, {pieInitial} from "./FormPie";

import Themes from "./themes";

const FormByChartType = {
  line: FormLine,
  column: FormColumn,
  pie: FormPie
};

const TabsByChartType = [
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

export default class ModalChart extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialChartState();

    this.onSaveRequest = ::this.onSaveRequest;
    this.setStateModal = ::this.setStateModal;
  }

  getInitialChartState() {
    return {
      chartType: "line",
      line: {
        themes: Themes[this.props.tenant] || Themes.default,
        options: lineInitial
      },
      column: {
        themes: Themes[this.props.tenant] || Themes.default,
        options: columnInitial
      },
      pie: {
        themes: Themes[this.props.tenant] || Themes.default,
        options: pieInitial
      }
    };
  }

  componentWillReceiveProps() {
    let state = this.getInitialChartState();
    if (this.props.chart) {
      state[this.props.chart.type].options = Object.assign({}, this.props.chart.options);
      state[this.props.chart.type].themes = Object.assign({}, this.props.chart.themes);
      state.chartType = this.props.chart.type;
    }
    this.setState(state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isOpen || this.props.isOpen || false;
  }

  handleChartType(chartType) {
    this.setState({chartType});
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
              tabs={TabsByChartType} activeTab={currentChartType}
              onClickTab={clickedTab => this.handleChartType(clickedTab.value)}
            />
            <FormComponent
              key={"form-" + currentChartType + "-" + this.props.chartID}
              model={this.state[currentChartType]}
              chartID={this.props.chartID}
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
