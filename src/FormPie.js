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

  _changePercentage = (event) => {
    let data = {};
    data[this.chartType] = update(this.props.model, {percentage: {$set: event.target.checked} });
    this._setStateModal(data);
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
          handlePointAdd={() => this._handlePointAdd(this.props.model.numberOfMarkers)}
          handlePointRemove={this._handlePointRemove}
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
  data: [{
    name: "",
    value: [null]
  }],

  name: "",

  percentage: false
};
