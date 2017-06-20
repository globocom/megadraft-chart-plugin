/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, { Component } from "react";
import update from "immutability-helper";

import BaseForm, { commonInitialData } from "./form/baseForm";
import {COMMON_FIELDS} from "./form/commonFields";
import { Checkbox } from "./form/checkboxForm";

const pieFields = COMMON_FIELDS.concat([
  { name: "name",
    label: "Legenda das séries",
    placeholder: "Ex.: Meses"
  }
]);

export default class FormPie extends Component {
  _changePercentage = (event) => {
    let data = update(this.props.model, {options: {percentage: {$set: event.target.checked}}});
    this.props.setStateModal(data);
  }

  render() {
    let options = this.props.model.options;
    return (
      <div>
        <BaseForm
          model={this.props.model}
          fields={pieFields}
          themes={this.props.themes}
          chartType={"pie"}
          chartID={this.props.chartID}
          setStateModal={this.props.setStateModal}
        >
          <div className="bs-ui-form-control">
            <label className="bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space">
              <Checkbox
                checked={options.percentage === true}
                onChange={this._changePercentage}
              />Calcular percentual automaticamente
            </label>
          </div>
        </BaseForm>
      </div>
    );
  }
}

export const pieInitial = {
  ...commonInitialData,
  name: "",
  percentage: false
};
