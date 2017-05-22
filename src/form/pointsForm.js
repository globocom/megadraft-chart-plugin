/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import PropTypes from "prop-types";

import { FormCloseButton, FormPlusButton } from "./buttonsForm";
import { TextInput } from "./inputs";
import { PlusIcon, CloseIcon } from "./../icon";

export default class PointsForm extends Component {
  renderPointInputList(serie, index, key) {
    return serie.value.map(function(data, indexPoint) {
      return (
        <TextInput
          key={"point-" + this.props.chartID + "-" + index + "-" + indexPoint + "-" + key}
          name={"seriePoint-" + index + "-" + indexPoint}
          className="chart-modal__form__point"
          placeholder="Valor"
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
          <PlusIcon/> Adicionar
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
          <CloseIcon/> Remover
        </FormCloseButton>
      </div>
    );
  }

  renderFormPoints() {
    const classNamePrefix = "chart-modal__form__points";
    const series = this.props.series || [];
    let key = this.props.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className={classNamePrefix}>
          { this.renderRemovePointButton(index) }
          <div className={classNamePrefix + "-header"}>
            <TextInput
              key={"name-" + this.props.chartID + "-" + index}
              name={"serieName-" + index}
              className={classNamePrefix + "-name"}
              placeholder="Nome da série"
              onChange={(event) => this.props.onChangeSerieName(event, index)}
              defaultValue={serie.name || serie[0]} />
            <TextInput
              key={"color-" + this.props.chartID + "-" + index}
              name={"color-" + index}
              className={classNamePrefix + "-color"}
              placeholder="Cor"
              onChange={(event) => this.props.onChangeColor(event, index)}
              defaultValue={this.props.themes.colors[index]} />
          </div>
          <div className={classNamePrefix + "-container"}>
            { this.renderPointInputList(serie, index, key) }
          </div>
        </div>
      );
    }, this);
  }

  render() {
    return (
      <div className="bs-ui-form-control">
        <label className="bs-ui-form-control__label">Séries</label>
        { this.renderFormPoints() }
        { this.renderAddPointButton() }
      </div>
    );
  }
}

PointsForm.propTypes = {
  series: PropTypes.array,
  serieKey: PropTypes.number,
  chartID: PropTypes.string,
  themes: PropTypes.object,
  onChangeSeriePoint: PropTypes.func,
  onChangeSerieName: PropTypes.func,
  onChangeColor: PropTypes.func
};
