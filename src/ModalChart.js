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

    this.state = this.getInitialChartState();
    this.chartType = "line";
    this.onSaveRequest = ::this.onSaveRequest;
    this.onCloseRequest = ::this.onCloseRequest;

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
      isFirstEditing: true,

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

  currentComponent() {
    let components = {
      line: FormLine,
      column: FormColumn,
      pie: FormPie
    };

    return components[this.chartType];
  }

  handleChartType(chartType) {
    this.chartType = chartType;
    this.setState({
      isFirstEditing: false
    });
  }

  componentWillReceiveProps() {
    let state = this.getInitialChartState();
    if (this.props.chart) {
      state[this.props.chart.type].options = this.props.chart.options;
      state[this.props.chart.type].themes = this.props.chart.themes;
    }
    this.setState(state);
  }

  onCloseRequest() {
    this.setState({
      isFirstEditing: true
    });
    this.props.onCloseRequest();
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
    let themes = this.state[this.chartType].themes;
    let options = this.state[this.chartType].options;
    let svgData = this._encodeOptimizedSVGDataUri(this.chartComponent.chart.getSVG());

    this.props.onSaveRequest({
      type: this.chartType,
      themes: themes,
      options: options,
      svg: svgData
    });
  }

  setStateModal = (data) => {
    let newState = {};
    newState[this.chartType] = data;
    newState.isFirstEditing = false;
    this.setState(newState);
  }

  render() {
    let FormComponent = this.currentComponent();
    return (
      <Modal className="chart-modal"
             title="Gráfico"
             isOpen={this.props.isOpen}
             onCloseRequest={this.onCloseRequest}
             width="98%"
             height="96%">
        <ModalBody ref="body">
          <div className="chart-modal__form">
            <Tabs
              tabs={this.tabs} activeTab={this.chartType}
              onClickTab={clickedTab => this.handleChartType(clickedTab.value)}
            />
            <FormComponent
              key={"form-" + this.chartType + "-" + this.props.chartID}
              model={this.state[this.chartType]}
              chartID={this.props.chartID}
              chartType={this.chartType}
              setStateModal={this.setStateModal} />
          </div>
          <div className="chart-modal__chart">
            <Chart
              id="chart-modal__preview"
              key={"chart-" + this.chartType + "-" + this.props.chartID}
              ref={(chartComponent) => {this.chartComponent = chartComponent;}}
              themes={this.state[this.chartType].themes}
              data={this.state[this.chartType].options}
              type={this.chartType} />
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
