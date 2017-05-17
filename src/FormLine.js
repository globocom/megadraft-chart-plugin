/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, { Component } from "react";
import update from "immutability-helper";

import CommonForm from "./form/commonForm";
import { PlusIcon, CloseIcon } from "./icon";
import {FormCloseButton, FormPlusButton} from "./buttonsForm";

export default class FormLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serieKey: 0
    };

    this.serieKeyInterval = 100;
  }

  _getKeyValue = (event) => {
    let key = event.target.attributes.name.nodeValue;
    let serieKey = key.split("-");
    return {key: key, value: event.target.value, indexA: parseInt(serieKey[1]), indexB: parseInt(serieKey[2])};
  }

  _changeSerieName = (event) => {
    let {value, indexA} = this._getKeyValue(event);
    return {line: update(this.props.model, {series: {[indexA]: {$merge: {name: value} }}})};
  }

  _changeSeriePoint = (event) => {
    let {value, indexA, indexB} = this._getKeyValue(event);
    return {line: update(this.props.model, {series: {[indexA]: {data: {$merge: {[indexB]: parseFloat(value.replace(",", "."))}}}}})};
  }

  _changeCategory = (event) => {
    let {value, indexA} = this._getKeyValue(event);
    return {line: update(this.props.model, {categories: {$merge: {[indexA]: value} }})};
  }

  _changeColor = (event) => {
    let {value, indexA} = this._getKeyValue(event);
    return {line: this.props.model, lineThemes: update(this.props.themes, {colors: {$merge: {[indexA]: value} }})};
  }

  _changeLabels = (event) => {
    return {line: update(this.props.model, {labels: {$set: event.target.checked} })};
  }

  _changeCommon = (event) => {
    let {key, value} = this._getKeyValue(event);
    return {line: update(this.props.model, {[key]: {$set: value}})};
  }

  _change = (method) => (event) => {
    this.props.setStateModal({...method(event), isFirstEditing: false});
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
            <input
              ref={"serieName-" + index}
              key={"name-" + this.props.chartID + "-" + key}
              type="text"
              name={"serieName-" + index}
              className={"bs-ui-form-control__field " + classNamePrefix + "-name"}
              placeholder="Nome da série"
              onChange={this._change(this._changeSerieName)}
              defaultValue={serie.name} />
            <input
              ref={"color-" + index}
              key={"color-" + this.props.chartID + "-" + key}
              type="text"
              name={"color-" + index}
              className={"bs-ui-form-control__field " + classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={this._change(this._changeColor)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div className={classNamePrefix + "-container"}>
          {serie.data.map(function(data, indexPoint) {
            return <input
              ref={"seriePoint-" + index + "-" + indexPoint}
              key={"point-" + this.props.chartID + "-" + index + "-" + indexPoint + "-" + key}
              type="text"
              name={"seriePoint-" + index + "-" + indexPoint}
              className="bs-ui-form-control__field chart-modal__form__point"
              placeholder="Valor"
              onChange={this._change(this._changeSeriePoint)}
              defaultValue={data} />;
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
          return <input
            ref={"category-" + index}
            key={"point-" + this.props.chartID + "-" + index}
            type="text"
            name={"category-" + index}
            className={"bs-ui-form-control__field " + classNameFormPrefix + "__point"}
            placeholder="Categoria"
            onChange={this._change(this._changeCategory)}
            defaultValue={category} />;
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

export const lineThemes = {
  "default": {
    colors: [
      "#f45b5b",
      "#8085e9",
      "#8d4654",
      "#7798BF",
      "#aaeeee",
      "#ff0066",
      "#eeaaee",
      "#55BF3B",
      "#DF5353",
      "#7798BF",
      "#aaeeee"
    ]
  }
};

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
