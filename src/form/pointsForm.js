/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";
import PropTypes from "prop-types";

import update from "immutability-helper";

export default class PointsForm extends Component {
  constructor(props) {
    super(props);

    this.changeSerieName = ::this.changeSerieName;
    this.changeSeriePoint = ::this.changeSeriePoint;
    this.changeColor = ::this.changeColor;
    this.handlePointColumnAdd = ::this.handlePointColumnAdd;
    this.handlePointColumnRemove = ::this.handlePointColumnRemove;
  }

  _getKeyValue(event) {
    let key = event.target.attributes.name.nodeValue;
    let serieKey = key.split("-");

    return {
      key: key,
      value: event.target.value,
      index: parseInt(serieKey[1])
    };
  }

  changeSerieName(event) {
    let {value, index} = this._getKeyValue(event);
    this.props.onChange({
      data: {
        [index]: {
          $merge: {
            [0]: value
          }
        }
      }
    });
  }

  changeSeriePoint(event) {
    let {value, index} = this._getKeyValue(event);
    this.props.onChange({
      data: {
        [index]: {
          $merge: {
            [1]: parseFloat(value.replace(",", "."))
          }
        }
      }
    });
  }

  changeColor(event) {
    let {value, index} = this._getKeyValue(event);
    this.props.onChange({
      column: this.props.model,
      columnThemes: update(this.props.themes, {colors: {$merge: {[index]: value} }})
    });
  }

  handlePointColumnAdd() {
    let serieKey = this.props.serieKey + this.serieKeyInterval;
    let column = update(this.props.model, {data: {$push: [["", null]]}} );
    this.setState({serieKey});
    this.props.setStateModal({column, isFirstEditing: false});
  }

  handlePointColumnRemove(index) {
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

  _renderFormPoints() {
    const classNamePrefix = "chart-modal__form__points";
    const series = this.props.series || [];
    let key = this.props.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className={classNamePrefix}>
          <div className="chart-modal__form__btn-group">
            <button
              ref={"handlePointPieRemove-" + index}
              className="bs-ui-button bs-ui-button--small bs-ui-button--red chart-modal__form__btn-remove"
              onClick={() => this.handlePointPieRemove(index)}>
              <CloseIcon /> Remover
            </button>
          </div>
          <div className={classNamePrefix + "-header"}>
            <input
              ref={"serieName-" + index}
              key={"name-" + this.props.chartID + "-" + index}
              type="text"
              name={"serieName-" + index}
              className={"bs-ui-form-control__field " + classNamePrefix + "-name"}
              placeholder="Nome da série"
              onChange={this.changeSerieName}
              defaultValue={serie.name} />
            <input
              ref={"color-" + index}
              key={"color-" + this.props.chartID + "-" + index}
              type="text"
              name={"color-" + index}
              className={"bs-ui-form-control__field " + classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={this.changeColor}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div>
            <input
              ref={"seriePoint-" + index}
              key={"point-" + this.props.chartID + "-" + index}
              type="text"
              name={"seriePoint-" + index}
              className="bs-ui-form-control__field"
              placeholder="Valor"
              onChange={this.changeSeriePoint}
              defaultValue={serie.y} />
          </div>
        </div>
      );
    }, this);
  }

  render() {
    return (
      <div className="bs-ui-form-control">
        <label className="bs-ui-form-control__label">Séries</label>
        { this._renderFormPoints() }
        <div className="new-point chart-modal__form__btn-group">
          <button
            ref="handlePointColumnAdd"
            className="bs-ui-button bs-ui-button--small bs-ui-button--blue chart-modal__form__btn-add"
            onClick={() => this.handlePointColumnAdd()}>
            <PlusIcon /> Adicionar
          </button>
        </div>
      </div>
    );
  }
}

PointsForm.propTypes = {
  series: PropTypes.array,
  serieKey: PropTypes.number,
  chartId: PropTypes.number,
  themes: PropTypes.object,
  model: PropTypes.object,
  onChange: PropTypes.func
};
