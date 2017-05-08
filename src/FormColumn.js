/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import update from "immutability-helper";
import { PlusIcon, CloseIcon } from "./icon";


export default class FormColumn extends Component {
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
    return {key: key, value: event.target.value, index: parseInt(serieKey[1])};
  }

  _changeSerieName = (event) => {
    let {value, index} = this._getKeyValue(event);
    return {column: update(this.props.model, {data: {[index]: {$merge: {[0]: value}}}} )};
  }

  _changeSeriePoint = (event) => {
    let {value, index} = this._getKeyValue(event);
    return {column: update(this.props.model, {data: {[index]: {$merge: {[1]: parseFloat(value.replace(",", "."))}}}} )};
  }

  _changeColor = (event) => {
    let {value, index} = this._getKeyValue(event);
    return {columnThemes: update(this.props.themes, {colors: {$merge: {[index]: value} }})};
  }

  _changeInverted = (event) => {
    let {value} = this._getKeyValue(event);
    return {column: update(this.props.model, {inverted: {$set: (value === "true")} })};
  }

  _changeCommon = (event) => {
    let {key, value} = this._getKeyValue(event);
    return {column: update(this.props.model, {[key]: {$set: value}})};
  }

  _change = (method) => (event) => {
    this.props.setStateModal({...method(event), isFirstEditing: false});
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

    if (newSeries.length === 1) return;

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

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <div className="btn-group">
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--red btn-remove"
              onClick={() => this._handlePointColumnRemove(index)}>
              <CloseIcon /> Remover
            </button>
          </div>
          <div className="points-header">
            <input
              key={"name-" + this.props.chartID + "-" + index}
              type="text"
              name={"serieName-" + index}
              className="bs-ui-form-control__field points-name"
              placeholder="Nome da série"
              onChange={this._change(this._changeSerieName)}
              defaultValue={serie[0]} />
            <input
              key={"color-" + this.props.chartID + "-" + index}
              type="text"
              name={"color-" + index}
              className="bs-ui-form-control__field color-input"
              placeholder="Cor"
              onChange={this._change(this._changeColor)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div>
            <input
              key={"point-" + this.props.chartID + "-" + index}
              type="text"
              name={"seriePoint-" + index}
              className="bs-ui-form-control__field"
              placeholder="Valor"
              onChange={this._change(this._changeSeriePoint)}
              defaultValue={serie[1]} />
          </div>
        </div>
      );
    }, this);
  }

  _renderColumnForm = () => {
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
            className="bs-ui-form-control__label">Legenda do eixo</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: Anos"
            name="yAxisTitle"
            onChange={this._change(this._changeCommon)}
            defaultValue={model.yAxisTitle} />
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label">Legenda das séries</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            placeholder="Ex.: Meses"
            name="name"
            onChange={this._change(this._changeCommon)}
            value={model.name} />
        </div>
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Orientação do gráfico</label>
          <label className="bs-ui-radio bs-ui-radio--small">
            <input type="radio" name="inverted" value="false" checked={model.inverted === false} onChange={this._change(this._changeInverted)} />Vertical
          </label>
          <label className="bs-ui-radio bs-ui-radio--small">
            <input type="radio" name="inverted" value="true" checked={model.inverted === true} onChange={this._change(this._changeInverted)} />Horizontal
          </label>
        </div>
        <div className="bs-ui-form-control clear group">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderColumnFormPoints()}
          <div className="new-point btn-group">
            <button
              className="bs-ui-button bs-ui-button--small bs-ui-button--blue btn-add"
              onClick={() => this._handlePointColumnAdd()}>
              <PlusIcon /> Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this._renderColumnForm();
  }
}

export const columnThemes = {
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
