/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, { Component } from "react";

import update from "immutability-helper";

import {COMMON_FIELDS} from "./form/commonFields";

import BaseForm, { commonInitialData } from "./form/baseForm";
import { RadioButtonVertical, RadioButtonHorizontal } from "./form/radioButtons";

const columnFields = COMMON_FIELDS.concat([
  {
    name: "yAxisTitle",
    label: "Legenda do eixo",
    placeholder: "Ex.: Anos"
  },
  {
    name: "name",
    label: "Legenda das séries",
    placeholder: "Ex.: Meses"
  }
]);

export default class FormColumn extends Component {
  _changeInverted = (event) => {
    let value = event.target.value;
    this.props.setStateModal(update(this.props.model, {options: {inverted: {$set: (value === "true")}}}));
  }

  render() {
    let options = this.props.model.options;
    return (
      <div>
        <BaseForm
          model={this.props.model}
          fields={columnFields}
          chartType={this.props.chartType}
          chartID={this.props.chartID}
          setStateModal={this.props.setStateModal}
        >
          <div className="bs-ui-form-control">
            <label className="bs-ui-form-control__label">Orientação do gráfico</label>
            <label
              className="bs-ui-radio bs-ui-radio--small radio-label-space">
              <RadioButtonVertical
                checked={options.inverted === false}
                onChange={this._changeInverted} />Vertical
            </label>
            <label
              className="bs-ui-radio bs-ui-radio--small radio-label-space">
              <RadioButtonHorizontal
                checked={options.inverted === true}
                onChange={this._changeInverted} />Horizontal
            </label>
          </div>
        </BaseForm>
      </div>
    );
  }
}

export const columnInitial = {
  ...commonInitialData,
  yAxisTitle: "",
  name: "",
  inverted: false
};
