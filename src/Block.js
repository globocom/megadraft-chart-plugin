/*
 * Copyright (c) 2017, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import ModalChart from "./ModalChart";

import { CreateChartByType } from "./HighchartsConnector";

const {BlockContent, BlockData, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._handleEdit = ::this._handleEdit;
    this._renderChart = ::this._renderChart;

    this.tenant = window.sessionStorage.tenantSelectedId || "default";

    this.state = {
      isEditing: false,
      isFirstEditing: false
    };

    this.actions = [
      {"key": "edit", "icon": MegadraftIcons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  componentDidMount() {
    if (!this.props.data.chart) {
      return;
    }
    this._renderChart(this.props.data.chart);
  }

  _renderChart(chart) {
    CreateChartByType(chart.type, "chart-" + this._getChartID(), chart.themes.colors, chart.options);
  }

  _getChartID = () => {
    return this.props.container.props.offsetKey.split("-")[0];
  }

  _handleEdit() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("megadraft-modal--open");
    this.setState({
      isEditing: true,
      isFirstEditing: true
    });
  }

  _onModalClose = () => {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("megadraft-modal--open");
    if (!this.state.isEditing) {
      return;
    }
    this.setState({
      isEditing: false
    });
  }

  _onSave = (chart) => {
    this.setState({
      isEditing: false
    });

    this.props.container.updateData({chart});
    this._renderChart(chart);
  }

  render(){
    return (
      <div>
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent>
            <div id={"chart-" + this._getChartID()}></div>
          </BlockContent>
          <BlockData>
          </BlockData>
        </CommonBlock>
        <ModalChart
          isOpen={this.state.isEditing}
          chartID={this._getChartID()}
          tenant={this.tenant}
          chart={this.props.data.chart}
          onCloseRequest={this._onModalClose}
          onSaveRequest={this._onSave} />
      </div>
    );
  }
}
