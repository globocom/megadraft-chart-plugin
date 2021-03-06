/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import React, {Component} from "react";
import PropTypes from "prop-types";

import { FormCloseButton, FormPlusButton } from "./inputs/Button";
import { TextInput } from "./inputs/Text";
import { PlusIcon, CloseIcon } from "./../icon";

function hexColorGenerator() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export default class PointsForm extends Component {
  renderPointInputList(serie, index) {
    return serie.value.map(function(data, indexPoint) {
      return (
        <TextInput
          key={"point-" + index + "-" + indexPoint}
          name={"seriePoint-" + index + "-" + indexPoint}
          className="chart-modal__form__point"
          placeholder={__("Value")}
          onChange={(event) => this.props.onChangeSeriePoint(event, index, indexPoint)}
          defaultValue={data}
        />
      );
    }, this, index);
  }

  renderAddPointButton() {
    return (
      <div className="chart-modal__form__btn-group">
        <FormPlusButton
          name="handlePointAdd"
          onClick={this.props.handlePointAdd}>
          <PlusIcon/> {__("Add")}
        </FormPlusButton>
      </div>
    );
  }

  renderRemovePointButton(index) {
    return (
      <div className="chart-modal__form__btn-group">
        <FormCloseButton
          name={"handlePointRemove-" + index}
          onClick={() => this.props.handlePointRemove(index)}>
          <CloseIcon/> {__("Remove")}
        </FormCloseButton>
      </div>
    );
  }

  renderFormPoints() {
    const classNamePrefix = "chart-modal__form__points";
    const series = this.props.series || [];

    return series.map(function(serie, index) {

      while (!this.props.themes.colors[index]) {
        this.props.themes.colors.push(hexColorGenerator());
      }

      return (
        <div key={"points-" + index} className={classNamePrefix}>
          { (series.length > 1) ? this.renderRemovePointButton(index) : "" }
          <div className={classNamePrefix + "-header"}>
            <TextInput
              name={"serieName-" + index}
              className={classNamePrefix + "-name"}
              placeholder={__("Serie name")}
              onChange={(event) => this.props.onChangeSerieName(event, index)}
              defaultValue={serie.name || serie[0]} />
            <TextInput
              type="color"
              name={"color-" + index}
              className={classNamePrefix + "-color"}
              placeholder={__("Color")}
              onChange={(event) => this.props.onChangeColor(event, index)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div className={classNamePrefix + "-container"}>
            { this.renderPointInputList(serie, index) }
          </div>
        </div>
      );
    }, this);
  }

  render() {
    return (
      <div className="bs-ui-form-control">
        <label className="bs-ui-form-control__label">{__("Series")}</label>
        { this.renderFormPoints() }
        { this.renderAddPointButton() }
      </div>
    );
  }
}

PointsForm.propTypes = {
  series: PropTypes.array,
  themes: PropTypes.object,
  onChangeSeriePoint: PropTypes.func,
  onChangeSerieName: PropTypes.func,
  onChangeColor: PropTypes.func
};
