/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import ModalChart from "./ModalChart";
import Chart from "./Chart";
import BaseEditComponent from "./BaseEditComponent";

const {BlockContent, BlockData, CommonBlock} = MegadraftPlugin;

export default class Block extends BaseEditComponent {
  constructor(props) {
    super(props);
    this.onSave = ::this.onSave;

    this.actions = [
      {"key": "edit", "icon": MegadraftIcons.EditIcon, "action": this.handleEdit},
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _getChartID() {
    return this.props.container.props.offsetKey.split("-")[0];
  }

  onSave(chart) {
    this.onModalClose();
    this.props.container.updateData({chart});
  }

  render(){
    var chartData;
    var currentTheme = this.getCurrentTheme();
    if (this.props.data) {
      chartData = this.props.data.chart;
    }

    if (chartData) {
      let chartDataColors = chartData.themes.colors;
      chartData.themes.colors = chartDataColors.concat(
        currentTheme.colors.slice(
          chartDataColors.length, currentTheme.colors.length
        )
      );
    }

    return (
      <div>
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent>
            {
              chartData &&
              <Chart
                id={"chart-" + this._getChartID()}
                type={chartData.type}
                theme={chartData.themes}
                data={chartData.options}
              />
            }
          </BlockContent>
          <BlockData>
          </BlockData>
        </CommonBlock>
        <ModalChart
          isOpen={this.state.isModalOpen}
          chartID={this._getChartID()}
          theme={currentTheme}
          chart={chartData}
          onCloseRequest={this.onModalClose}
          onSaveRequest={this.onSave}
        />
      </div>
    );
  }
}
