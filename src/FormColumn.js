/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import React, { Component } from "react";

import update from "immutability-helper";

import {COMMON_FIELDS} from "./form/commonFields";

import BaseForm, { commonInitialData } from "./form/baseForm";
import { RadioButtonVertical, RadioButtonHorizontal } from "./form/radioButtons";

const columnFields = COMMON_FIELDS.concat([
  {
    name: "yAxisTitle",
    label: __("Axis Legend"),
    placeholder: "Ex.: " + __("Years")
  },
  {
    name: "name",
    label: __("Legenda das séries"),
    placeholder: "Ex.: " + __("Months")
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
          chartType={"column"}
          chartID={this.props.chartID}
          setStateModal={this.props.setStateModal}
        >
          <div className="bs-ui-form-control">
            <label className="bs-ui-form-control__label">{__("Chart orientation")}</label>
            <label
              className="bs-ui-radio bs-ui-radio--small radio-label-space">
              <RadioButtonVertical
                checked={options.inverted === false}
                onChange={this._changeInverted} />{__("Vertical")}
            </label>
            <label
              className="bs-ui-radio bs-ui-radio--small radio-label-space">
              <RadioButtonHorizontal
                checked={options.inverted === true}
                onChange={this._changeInverted} />{__("Horizontal")}
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
