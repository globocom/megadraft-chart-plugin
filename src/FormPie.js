/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";
import update from "immutability-helper";

import BaseForm, {Themes} from "./form/baseForm";
import CommonForm from "./form/commonForm";
import { PlusIcon, CloseIcon } from "./icon";
import {FormCloseButton, FormPlusButton} from "./form/buttonsForm";
import {Checkbox} from "./form/checkboxForm";
import {TextInput} from "./form/inputs";

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

  _renderPieFormPoints = () => {
    let series = this.props.model.data || [];
    let key = this.state.serieKey;
    const classNamePrefix = "chart-modal__form__points";

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className={classNamePrefix}>
          <div className="chart-modal__form__btn-group">
            <FormCloseButton
              name={"handlePointPieRemove-" + index}
              onClick={() => this._handlePointPieRemove(index)}>
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
              defaultValue={serie.name} />
            <TextInput
              key={"color-" + this.props.chartID + "-" + index}
              name={"color-" + index}
              className={classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={(event) => this._changeColor(event, index)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div>
            <TextInput
              key={"point-" + this.props.chartID + "-" + index}
              name={"seriePoint-" + index}
              placeholder="Valor"
              onChange={(event) => this._changeSeriePoint(event, index)}
              defaultValue={serie.y} />
          </div>
        </div>
      );
    }, this);
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
        <div className="bs-ui-form-control">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderPieFormPoints()}
          <div className="new-point chart-modal__form__btn-group">
            <FormPlusButton
              name="handlePointPieAdd"
              onClick={() => this._handlePointPieAdd()}>
              <PlusIcon/> Adicionar
            </FormPlusButton>
          </div>
        </div>
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
