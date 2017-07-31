/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import React, {Component} from "react";
import update from "immutability-helper";

import BaseForm, { commonInitialData } from "./Base";
import {COMMON_FIELDS} from "./commonFields";
import { FormCloseButton, FormPlusButton } from "./inputs/Button";
import { TextInput } from "./inputs/Text";

import { PlusIcon, CloseIcon } from "./../icon";


let lineFields = COMMON_FIELDS.concat([
  {
    name: "yAxisTitle",
    label: __("Y Axis Legend"),
    placeholder: "Ex.: " + __("Years")
  }
]);


export default class FormLine extends Component {
  _changeCategory = (event, index) => {
    let value = event.target.value;
    this.props.setStateModal(update(this.props.model, {options: {categories: {$merge: {[index]: value} }}}));
  }

  _changeLabels = (event) => {
    this.props.setStateModal(update(this.props.model, {options: {labels: {$set: event.target.checked}}}));
  }

  _addPoint = () => {
    let line = JSON.parse(JSON.stringify(this.props.model));
    line.options.numberOfMarkers++;
    line.options.data.map(function(object) {
      object.value.push(null);
    });
    line.options.categories = line.options.categories.concat(new Array(1).fill(""));
    this.props.setStateModal(line);
  }

  _removePoint = () => {
    let line = JSON.parse(JSON.stringify(this.props.model));
    line.options.numberOfMarkers--;
    if (line.options.numberOfMarkers === 0) {
      return;
    }
    line.options.data.map(function(object) {
      object.value.pop();
    });
    line.options.categories = line.options.categories.slice(0, line.options.numberOfMarkers);
    this.props.setStateModal(line);
  }

  _renderLineFormCategories = () => {
    let categories = this.props.model.options.categories || [];
    const classNameFormPrefix = "chart-modal__form";

    return (
      <div className={classNameFormPrefix + "__points-container"}>
        {categories.map(function(category, index) {
          return (
            <TextInput
              key={"point-" + index}
              name={"category-" + index}
              className={classNameFormPrefix + "__point"}
              placeholder={__("Category")}
              onChange={(event) => this._changeCategory(event, index)}
              defaultValue={category}
            />
          );
        }, this)}
      </div>
    );
  }

  render() {
    let options = this.props.model.options;

    return (
      <div>
        <BaseForm
          model={this.props.model}
          fields={lineFields}
          chartType={"line"}
          setStateModal={this.props.setStateModal}
        >
          <div className="bs-ui-form-control">
            <label className="bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space">
              <input
                ref="labels"
                type="checkbox"
                name="labels"
                value="labels"
                checked={options.labels === true}
                onChange={this._changeLabels} />{__("Make labels visible")}
            </label>
          </div>
          <div className="bs-ui-form-control">
            <label
              className="bs-ui-form-control__label chart-modal__form__label-category">{__("X Axis categories")}</label>
            <div className="chart-modal__form__btn-group">
              {
                (options.categories.length > 1)
                  ? <FormCloseButton
                      name="removePoint"
                      onClick={this._removePoint}>
                      <CloseIcon/> {__("Remove")}
                    </FormCloseButton>
                  : ""
              }
              <FormPlusButton
                name="addPoint"
                onClick={ this._addPoint}>
                <PlusIcon/> {__("Add")}
              </FormPlusButton>
            </div>
            {this._renderLineFormCategories()}
          </div>
        </BaseForm>
      </div>
    );
  }
}

export const lineInitial = {
  ...commonInitialData,
  data: [{
    name: "",
    value: [null, null, null]
  }],
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 3,
  categories: ["", "", ""]
};
