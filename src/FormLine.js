/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, { Component } from "react";
import update from "immutability-helper";
import { PlusIcon, CloseIcon } from "./icon";


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
    line.series.map(function(object) {object.data.push(null)});
    line.categories = line.categories.concat(new Array(1).fill(""));
    this.props.setStateModal({line, isFirstEditing: false});
  }

  _removePoint = () => {
    let line = JSON.parse(JSON.stringify(this.props.model));
    line.numberOfMarkers--;
    if (line.numberOfMarkers === 0) return;
    line.series.map(function(object) {object.data.pop()});
    line.categories = line.categories.slice(0, line.numberOfMarkers);
    this.props.setStateModal({line, isFirstEditing: false});
  }

  _handlePointLineAdd = () => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let line = update(this.props.model, {series: {$push: [{name: "", data: new Array(parseInt(this.props.model.numberOfMarkers)).fill(null)}]}});
    this.setState({serieKey});
    this.props.setStateModal({line, isFirstEditing: false});
  }

  // _handlePointLineRemove = (index) => {
  //   let serieKey = this.state.serieKey - this.serieKeyInterval;
  //   let line = update(this.props.model, {series: {$splice: [[index, 1]]}});
  //   this.setState({serieKey});
  //   this.props.setStateModal({line, isFirstEditing: false});
  // }

  _handlePointLineRemove = (index) => {
    let newSeries = this.props.model.series;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let line, lineThemes;
    let newLineThemes = this.props.themes;

    if (newSeries.length === 1) return;

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

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <div className="btn-group">
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--red btn-remove"
              onClick={() => this._handlePointLineRemove(index)}>
              <CloseIcon /> Remover
            </button>
          </div>
          <div className="points-header">
            <input
              key={"name-" + this.props.chartID + "-" + key}
              type="text"
              name={"serieName-" + index}
              className="bs-ui-form-control__field points-name"
              placeholder="Nome da série"
              onChange={this._change(this._changeSerieName)}
              defaultValue={serie.name} />
            <input
              key={"color-" + this.props.chartID + "-" + key}
              type="text"
              name={"color-" + index}
              className="bs-ui-form-control__field color-input"
              placeholder="Cor"
              onChange={this._change(this._changeColor)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div className="points-marker">
          {serie.data.map(function(data, indexPoint) {
            return <input
              key={"point-" + this.props.chartID + "-" + index + "-" + indexPoint + "-" + key}
              type="text"
              name={"seriePoint-" + index + "-" + indexPoint}
              className="bs-ui-form-control__field point"
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

    return (
      <div className="points-category clear">
        {categories.map(function(category, index) {
          return <input
            key={"point-" + this.props.chartID + "-" + index}
            type="text"
            name={"category-" + index}
            className="bs-ui-form-control__field point"
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
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Título</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: Veja histórico da taxa de analfabetismo no brasil"
            name="title"
            onChange={this._change(this._changeCommon)}
            defaultValue={model.title} />
        </div>
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Subtítulo</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: Índice não apresentava um aumento desde 1997"
            name="subtitle"
            onChange={this._change(this._changeCommon)}
            defaultValue={model.subtitle} />
        </div>
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Fonte de Dados</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: IBGE"
            name="credits"
            onChange={this._change(this._changeCommon)}
            defaultValue={model.credits} />
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label">Legenda do eixo Y</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: Anos"
            name="yAxisTitle"
            onChange={this._change(this._changeCommon)}
            value={model.yAxisTitle} />
        </div>
        <div className="bs-ui-form-control group">
          <label className="bs-ui-checkbox bs-ui-checkbox--small">
            <input
              type="checkbox"
              name="labels"
              value="labels"
              checked={model.labels === true}
              onChange={this._change(this._changeLabels)} />Tornar labels visíveis
          </label>
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label label-group">Categorias do eixo X</label>
          <div className="btn-group">
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--red btn-remove"
              onClick={this._removePoint}>
              <CloseIcon /> Remover
            </button>
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--blue btn-add"
              onClick={this._addPoint}>
              <PlusIcon /> Adicionar
            </button>
          </div>
          {this._renderLineFormCategories()}
        </div>
        <div className="bs-ui-form-control clear group">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderLineFormPoints()}
          <div className="new-point btn-group">
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--blue btn-add"
              onClick={() => this._handlePointLineAdd()}>
              <PlusIcon /> Adicionar
            </button>
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
  "g1": {
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
