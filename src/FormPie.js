/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class FormPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: this.props.colors,
      model: this.props.model,
      serieKey: 0
    };

    this.serieKeyInterval = 100;
  }

  _onChange = (e) => {
    let key = e.target.attributes.name.nodeValue;
    let value = e.target.value;
    let pie = Object.assign({}, this.props.model, {[key]: value});
    let pieColors = Object.assign({}, this.props.colors);
    let serieKey = key.split('-');
    let newSeries;
    let newColors;

    if (serieKey[0].indexOf("serieName") === 0) {
      newSeries = this.props.model.data;
      newSeries[parseInt(serieKey[1])].name = value;
      pie = Object.assign({}, this.props.model, {data: newSeries});
    }

    if (serieKey[0].indexOf("seriePoint") === 0) {
      newSeries = this.props.model.data;
      newSeries[parseInt(serieKey[1])].y = parseFloat(value);
      pie = Object.assign({}, this.props.model, {data: newSeries});
    }

    if (serieKey[0].indexOf("color") === 0) {
      newColors = this.props.colors;
      newColors[serieKey[1]] = value;
      pieColors = Object.assign({}, this.props.colors, newColors);
      delete pie[key];
    }

    this.props.setStateModal({
      pie,
      pieColors,
      isFirstEditing: false
    });
  }

  _handlePointPieAdd = () => {
    let newSeries = this.props.model.data.concat([{name: "", y: null}]);
    let pie = Object.assign({}, this.props.model, {data: newSeries});
    let serieKey = this.state.serieKey + this.serieKeyInterval;

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      pie,
      isFirstEditing: false
    });
  }

  _handlePointPieRemove = (index) => {
    let newSeries = this.props.model.data
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let pie;

    newSeries.splice(index, 1);
    pie = Object.assign({}, this.props.model, {data: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      pie,
      isFirstEditing: false
    });
  }

  _renderPieFormPoints = () => {
    let series = this.props.model.data || [];
    let key = this.state.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <button
            className="bs-ui-button bs-ui-button--background-red bs-ui-button--small remove-button"
            onClick={() => this._handlePointPieRemove(index)}>remover</button>
          <input
            key={"color-" + this.props.chartID + "-" + index}
            type="text"
            name={"color-" + index}
            className="bs-ui-form-control__field color-input"
            placeholder="Cor"
            onChange={this._onChange}
            defaultValue={this.state.colors[index]} />
          <input
            key={"name-" + this.props.chartID + "-" + index}
            type="text"
            name={"serieName-" + index}
            className="bs-ui-form-control__field points-name"
            placeholder="Legenda"
            onChange={this._onChange}
            defaultValue={serie.name} />
          <div>
            <input
              key={"point-" + this.props.chartID + "-" + index}
              type="text"
              name={"seriePoint-" + index}
              className="bs-ui-form-control__field point"
              placeholder="Marcador"
              onChange={this._onChange}
              defaultValue={serie.y} />
          </div>
        </div>
      );
    }, this)
  }

  _renderPieForm = () => {
    let model = this.props.model;

    return (
      <div className="frame">
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Título</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="title"
            onChange={this._onChange}
            defaultValue={model.title} />
        </div>
        <div className="bs-ui-form-control group">
          <label className="bs-ui-form-control__label">Subtítulo</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="subtitle"
            onChange={this._onChange}
            defaultValue={model.subtitle} />
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label">Nome da Série</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="name"
            onChange={this._onChange}
            value={model.name} />
        </div>
        <div className="bs-ui-form-control clear group">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderPieFormPoints()}
          <div className="new-point clear">
            <button
              className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
              onClick={() => this._handlePointPieAdd()}>nova série</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this._renderPieForm();
  }
}

export const pieColors = [
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

export const pie = {
  title: "",
  subtitle: "",
  name: "",
  data: [
    {
      name: "",
      y: null
    }
  ]
}
