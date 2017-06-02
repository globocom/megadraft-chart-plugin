/*
 * Copyright (c) 2017, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import ModalChart from "./ModalChart";
import Chart from "./Chart";

const {BlockContent, BlockData, CommonBlock} = MegadraftPlugin;

export default class Block extends Component {
  constructor(props) {
    super(props);

    this._handleEdit = ::this._handleEdit;

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

  _getChartID() {
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
