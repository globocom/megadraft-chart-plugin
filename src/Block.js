/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import Modal, {ModalBody, ModalFooter} from "backstage-modal";
import ModalChart from "./ModalChart";

import {
  CreateChartLine,
  CreateChartColumn,
  CreateChartPie
} from "./ChartHelper";

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class ChartBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleEdit = ::this._handleEdit;

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
    if (this.props.data.chart) {
      CreateChartLine('chart-' + this._getChartID(), this.props.data.chart.options);
    }
  }

  _getChartID() {
    return this.props.container.props.offsetKey.split('-')[0];
  }

  _handleEdit() {
    this.setState({
      isEditing: true,
      isFirstEditing: true
    });
  }

  _handleCaptionChange(event) {
    this.props.container.updateData({caption: event.target.value});
  }

  _onModalClose = () => {
    if (!this.state.isEditing) {
      return;
    }
    this.setState({isEditing: false});
    if (this.state.isEditing) {
      this.props.container.remove();
    }
  }

  _onSave = (chart) => {
    this.setState({
      isEditing: false
    });

    this.props.container.updateData({...chart});
  }

  setStateChartBlock = (dict) => {
    this.setState(dict);
  }

  render(){
    return (
      <div>
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent>
            <div id={"chart-" + this._getChartID()}></div>
          </BlockContent>

          <BlockData>
            <BlockInput
              placeholder="Caption"
              value={this.props.data.caption}
              onChange={this._handleCaptionChange} />
          </BlockData>
        </CommonBlock>
        <ModalChart
          isOpen={this.state.isEditing}
          isFirstEditing={this.state.isFirstEditing}
          setStateChartBlock={this.setStateChartBlock}
          onCloseRequest={this._onModalClose}
          onSaveRequest={this._onSave}
          chartID={this._getChartID()}
          chart={this.props.data.chart} />
      </div>
    );
  }
}
