/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import update from "immutability-helper";

import BaseForm, { Themes } from "./form/baseForm";
import { Checkbox } from "./form/checkboxForm";

export default class FormPie extends Component {
  _changePercentage = (event) => {
    let data = {};
    data[this.props.chartType] = update(this.props.model, {percentage: {$set: event.target.checked} });
    this.props.setStateModal({...data, isFirstEditing: false});
  }

  render() {
    let model = this.props.model;
    return (
      <div>
        <BaseForm
          model={model}
          themes={this.props.themes}
          chartType={this.props.chartType}
          chartID={this.props.chartID}
          setStateModal={this.props.setStateModal}
          excludeCommonFields={["yAxisTitle"]}
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
