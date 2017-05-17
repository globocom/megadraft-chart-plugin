/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import update from "immutability-helper";

import BaseForm, {Themes} from "./form/baseForm";
import { PlusIcon, CloseIcon } from "./icon";
import {FormCloseButton, FormPlusButton} from "./form/buttonsForm";
import {RadioButtonVertical, RadioButtonHorizontal} from "./form/radioButtons";

import CommonForm from "./form/commonForm";
import {TextInput} from "./form/inputs";


export default class FormColumn extends BaseForm {
  constructor(props) {
    super(props);
    this.chartType = "column";
  }

  _changeSerieName = (event, index) => {
    let value = event.target.value;
    this._setStateModal({column: update(this.props.model, {data: {[index]: {$merge: {[0]: value}}}} )});
  }

  _changeSeriePoint = (event, index) => {
    let value = event.target.value;
    this._setStateModal({column: update(this.props.model, {data: {[index]: {$merge: {[1]: parseFloat(value.replace(",", "."))}}}} )});
  }

  _changeInverted = (event) => {
    let value = event.target.value;
    this._setStateModal({column: update(this.props.model, {inverted: {$set: (value === "true")} })});
  }

  _handlePointColumnAdd = () => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let column = update(this.props.model, {data: {$push: [["", null]]}} );
    this.setState({serieKey});
    this.props.setStateModal({column, isFirstEditing: false});
  }

  _handlePointColumnRemove = (index) => {
    let newSeries = this.props.model.data;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let column, columnThemes;
    let newColumnThemes = this.props.themes;

    if (newSeries.length === 1) {
      return;
    }

    newSeries.splice(index, 1);
    column = Object.assign({}, this.props.model, {data: newSeries});

    newColumnThemes.colors = newColumnThemes.colors.concat(newColumnThemes.colors.splice(index, 1));
    columnThemes = Object.assign({}, this.props.themes, newColumnThemes);

    this.setState({serieKey});
    this.props.setStateModal({column, columnThemes, isFirstEditing: false});
  }

  _renderColumnFormPoints = () => {
    let series = this.props.model.data || [];
    let key = this.state.serieKey;
    const classNamePrefix = "chart-modal__form__points";

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className={classNamePrefix}>
          <div className="chart-modal__form__btn-group">
            <FormCloseButton
              name={"handlePointColumnRemove-" + index}
              onClick={() => this._handlePointColumnRemove(index)}>
              <CloseIcon/> Remover
            </FormCloseButton>
          </div>
          <div className={classNamePrefix + "-header"}>
            <TextInput
              key={"name-" + this.props.chartID + "-" + index}
              name={"serieName-" + index}
              className={classNamePrefix + "-name"}
              placeholder="Nome da série"
              onChange={(event) => this._changeSerieName(event, index)}
              defaultValue={serie[0]}
            />
            <TextInput
              key={"color-" + this.props.chartID + "-" + index}
              name={"color-" + index}
              className={classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={(event) => this._changeColor(event, index)}
              defaultValue={this.props.themes.colors[index]}
            />
          </div>
          <div>
            <TextInput
              key={"point-" + this.props.chartID + "-" + index}
              name={"seriePoint-" + index}
              placeholder="Valor"
              onChange={(event) => this._changeSeriePoint(event, index)}
              defaultValue={serie[1]}
            />
          </div>
        </div>
      );
    }, this);
  }

  _renderColumnForm = () => {
    let model = this.props.model;

    return (
      <div>
        <CommonForm
          onChange={this._changeCommon}
          model={model}
        />
        <div className="bs-ui-form-control">
          <label className="bs-ui-form-control__label">Orientação do gráfico</label>
          <label
            className="bs-ui-radio bs-ui-radio--small radio-label-space">
            <RadioButtonVertical
              checked={model.inverted === false}
              onChange={this._changeInverted} />Vertical
          </label>
          <label
            className="bs-ui-radio bs-ui-radio--small radio-label-space">
            <RadioButtonHorizontal
              checked={model.inverted === true}
              onChange={this._changeInverted} />Horizontal
          </label>
        </div>
        <div className="bs-ui-form-control">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderColumnFormPoints()}
          <div className="new-point chart-modal__form__btn-group">
            <FormPlusButton
              name="handlePointColumnAdd"
              onClick={() => this._handlePointColumnAdd()}>
              <PlusIcon/> Adicionar
            </FormPlusButton>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this._renderColumnForm();
  }
}

export const columnThemes = Object.assign({}, Themes);

export const column = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  name: "",
  inverted: false,
  data: [
    ["", null]
  ]
};
