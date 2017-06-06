/*
 * Copyright (c) 2017, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
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
    return (
      <div>
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent>
            {
              this.props.data && this.props.data.chart &&
              <Chart
                id={"chart-" + this._getChartID()}
                type={this.props.data.chart.type}
                themes={this.props.data.chart.themes}
                data={this.props.data.chart.options}
              />
            }
          </BlockContent>
          <BlockData>
          </BlockData>
        </CommonBlock>
        <ModalChart
          isOpen={this.state.isModalOpen}
          chartID={this._getChartID()}
          tenant={this.tenant}
          chart={this.props.data.chart}
          onCloseRequest={this.onModalClose}
          onSaveRequest={this.onSave}
        />
      </div>
    );
  }
}
