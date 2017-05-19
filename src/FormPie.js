/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";
import update from "immutability-helper";

import BaseForm, { Themes } from "./form/baseForm";
import CommonForm from "./form/commonForm";
import PointsForm from "./form/pointsForm";
import { Checkbox } from "./form/checkboxForm";

export default class FormPie extends BaseForm {
  constructor(props) {
    super(props);

    this.chartType = "pie";
  }

  _changeSerieName = (event, index) => {
    let value = event.target.value;
    let data = {};

    data[this.chartType] = update(this.props.model, {data: {[index]: {$merge: {name: value}}}});
    this._setStateModal(data);
  }

  _changePercentage = (event) => {
    let data = {};
    data[this.chartType] = update(this.props.model, {percentage: {$set: event.target.checked} });
    this._setStateModal(data);
  }

  _handlePointPieAdd = () => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let pie = update(this.props.model, {data: {$push: [{name: "", y: null}] }} );
    this.setState({serieKey});
    this.props.setStateModal({pie, isFirstEditing: false});
  }

  _handlePointPieRemove = (index) => {
    let newSeries = this.props.model.data;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let pie, pieThemes;
    let newPieThemes = this.props.themes;

    if (newSeries.length === 1) {
      return;
    }

    newSeries.splice(index, 1);
    pie = Object.assign({}, this.props.model, {data: newSeries});

    newPieThemes.colors = newPieThemes.colors.concat(newPieThemes.colors.splice(index, 1));
    pieThemes = Object.assign({}, this.props.themes, newPieThemes);

    this.setState({serieKey});
    this.props.setStateModal({pie, pieThemes, isFirstEditing: false});
  }

  _renderPieForm = () => {
    let model = this.props.model;

    return (
      <div>
        <CommonForm
          onChange={this._changeCommon}
          model={model}
          excludeFields={["yAxisTitle"]}
        />
        <div className="bs-ui-form-control">
          <label className="bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space">
            <Checkbox
              checked={model.percentage === true}
              onChange={this._changePercentage}
            />Calcular percentual automaticamente
          </label>
        </div>
        <PointsForm
          series={this.props.model.data || []}
          serieKey={this.state.serieKey}
          chartID={this.props.chartID}
          themes={this.props.themes}
          onChangeSerieName={this._changeSerieName}
          onChangeSeriePoint={this._changeSeriePoint}
          onChangeColor={this._changeColor}
          handlePointAdd={this._handlePointPieAdd}
          handlePointRemove={this._handlePointPieRemove}
        />
      </div>
    );
  }

  render() {
    return this._renderPieForm();
  }
}

export const pieThemes = Object.assign({}, Themes);

export const pie = {
  title: "",
  subtitle: "",
  credits: "",
  name: "",
  percentage: false,
  data: [{
    name: "",
    y: null
  }]
};
