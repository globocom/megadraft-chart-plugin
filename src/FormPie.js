/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, { Component } from "react";
import update from "immutability-helper";

import BaseForm, { defaultThemes, defaultChartData } from "./form/baseForm";
import {COMMON_FIELDS} from "./form/commonFields";
import { Checkbox } from "./form/checkboxForm";

const pieFields = COMMON_FIELDS.filter(function(item) {
    return item.name !== "yAxisTitle";
});

export default class FormPie extends Component {
  _changePercentage = (event) => {
    let data = {
      pie: update(this.props.model, {percentage: {$set: event.target.checked} })
    };
    this.props.setStateModal(data);
  }

  render() {
    let model = this.props.model;
    return (
      <div>
        <BaseForm
          model={model}
          fields={pieFields}
          themes={this.props.themes}
          chartType={this.props.chartType}
          chartID={this.props.chartID}
          setStateModal={this.props.setStateModal}
        >
          <div className="bs-ui-form-control">
            <label className="bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space">
              <Checkbox
                checked={model.percentage === true}
                onChange={this._changePercentage}
              />Calcular percentual automaticamente
            </label>
          </div>
        </BaseForm>
      </div>
    );
  }
}

export const pieThemes = Object.assign({}, defaultThemes);
export const pie = {
  ...defaultChartData,
  name: "",
  percentage: false
};
