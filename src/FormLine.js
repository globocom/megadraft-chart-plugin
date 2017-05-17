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
import {TextInput} from "./form/inputs";

export default class FormLine extends BaseForm {
  constructor(props) {
    super(props);

    this.chartType = "line";
  }

  _getKeyValue = (event) => {
    let key = event.target.attributes.name.nodeValue;
    let serieKey = key.split("-");
    return {key: key, value: event.target.value, index: parseInt(serieKey[1]), indexB: parseInt(serieKey[2])};
  }

  _changeSerieName = (event) => {
    let {value, index} = this._getKeyValue(event);
    return {line: update(this.props.model, {series: {[index]: {$merge: {name: value} }}})};
  }

  _changeSeriePoint = (event) => {
    let {value, index, indexB} = this._getKeyValue(event);
    return {line: update(this.props.model, {series: {[index]: {data: {$merge: {[indexB]: parseFloat(value.replace(",", "."))}}}}})};
  }

  _changeCategory = (event) => {
    let {value, index} = this._getKeyValue(event);
    return {line: update(this.props.model, {categories: {$merge: {[index]: value} }})};
  }

  _changeLabels = (event) => {
    return {line: update(this.props.model, {labels: {$set: event.target.checked} })};
  }

  _addPoint = () => {
    let line = JSON.parse(JSON.stringify(this.props.model));
    line.numberOfMarkers++;
    line.series.map(function(object) {
      object.data.push(null);
    });
    line.categories = line.categories.concat(new Array(1).fill(""));
    this.props.setStateModal({line, isFirstEditing: false});
  }

  _removePoint = () => {
    let line = JSON.parse(JSON.stringify(this.props.model));
    line.numberOfMarkers--;
    if (line.numberOfMarkers === 0) {
      return;
    }
    line.series.map(function(object) {
      object.data.pop();
    });
    line.categories = line.categories.slice(0, line.numberOfMarkers);
    this.props.setStateModal({line, isFirstEditing: false});
  }

  _handlePointLineAdd = () => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let line = update(this.props.model, {series: {$push: [{name: "", data: new Array(parseInt(this.props.model.numberOfMarkers)).fill(null)}]}});
    this.setState({serieKey});
    this.props.setStateModal({line, isFirstEditing: false});
  }

  _handlePointLineRemove = (index) => {
    let newSeries = this.props.model.series;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let line, lineThemes;
    let newLineThemes = this.props.themes;

    if (newSeries.length === 1) {
      return;
    }

    newSeries.splice(index, 1);
    line = Object.assign({}, this.props.model, {series: newSeries});

    newLineThemes.colors = newLineThemes.colors.concat(newLineThemes.colors.splice(index, 1));
    lineThemes = Object.assign({}, this.props.themes, newLineThemes);

    this.setState({serieKey});
    this.props.setStateModal({line, lineThemes, isFirstEditing: false});
  }

  _renderLineFormPoints = () => {
    let series = this.props.model.series || [];
    let key = this.state.serieKey;
    const classNamePrefix = "chart-modal__form__points";

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className={classNamePrefix}>
          <div className="chart-modal__form__btn-group">
            <FormCloseButton
              name={"handlePointLineRemove-" + index}
              onClick={() => this._handlePointLineRemove(index)}>
              <CloseIcon/> Remover
            </FormCloseButton>
          </div>
          <div className={classNamePrefix + "-header"}>
            <TextInput
              key={"name-" + this.props.chartID + "-" + key}
              name={"serieName-" + index}
              className={classNamePrefix + "-name"}
              placeholder="Nome da série"
              onChange={this._change(this._changeSerieName)}
              defaultValue={serie.name}
            />
            <TextInput
              key={"color-" + this.props.chartID + "-" + key}
              name={"color-" + index}
              className={classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={this._change(this._changeColor)}
              defaultValue={this.props.themes.colors[index]}
            />
          </div>
          <div className={classNamePrefix + "-container"}>
          {serie.data.map(function(data, indexPoint) {
            return (
              <TextInput
                key={"point-" + this.props.chartID + "-" + index + "-" + indexPoint + "-" + key}
                name={"seriePoint-" + index + "-" + indexPoint}
                className="chart-modal__form__point"
                placeholder="Valor"
                onChange={this._change(this._changeSeriePoint)}
                defaultValue={data}
              />
            );
          }, this, index)}
          </div>
        </div>
      );
    }, this);
  }

  _renderLineFormCategories = () => {
    let categories = this.props.model.categories || [];
    const classNameFormPrefix = "chart-modal__form";

    return (
      <div className={classNameFormPrefix + "__points-container"}>
        {categories.map(function(category, index) {
          return (
            <TextInput
              key={"point-" + this.props.chartID + "-" + index}
              name={"category-" + index}
              className={classNameFormPrefix + "__point"}
              placeholder="Categoria"
              onChange={this._change(this._changeCategory)}
              defaultValue={category}
            />
          );
        }, this)}
      </div>
    );
  }

  _renderLineForm = () => {
    let model = this.props.model;

    return (
      <div>
        <CommonForm
          onChange={this._change(this._changeCommon)}
          model={model}
          excludeFields={["name"]}
        />
        <div className="bs-ui-form-control">
          <label className="bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space">
            <input
              ref="labels"
              type="checkbox"
              name="labels"
              value="labels"
              checked={model.labels === true}
              onChange={this._change(this._changeLabels)} />Tornar labels visíveis
          </label>
        </div>
        <div className="bs-ui-form-control">
          <label
            className="bs-ui-form-control__label chart-modal__form__label-category">Categorias do eixo X</label>
          <div className="chart-modal__form__btn-group">
            <FormCloseButton
              name="removePoint"
              onClick={this._removePoint}>
              <CloseIcon/> Remover
            </FormCloseButton>
            <FormPlusButton
              name="addPoint"
              onClick={this._addPoint}>
              <PlusIcon/> Adicionar
            </FormPlusButton>
          </div>
          {this._renderLineFormCategories()}
        </div>
        <div className="bs-ui-form-control">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderLineFormPoints()}
          <div className="new-point chart-modal__form__btn-group">
            <FormPlusButton
              name="handlePointLineAdd"
              onClick={() => this._handlePointLineAdd()}>
              <PlusIcon/> Adicionar
            </FormPlusButton>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this._renderLineForm();
  }
}

export const lineThemes = Object.assign({}, Themes);

export const line = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 3,
  categories: ["", "", ""],
  series: [{
    name: "",
    data: [null, null, null]
  }]
};
