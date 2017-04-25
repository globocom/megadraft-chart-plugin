/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class FormLine extends Component {
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
    let line = Object.assign({}, this.props.model, {[key]: value});
    let lineColors = Object.assign({}, this.props.colors);
    let serieKey = key.split('-');
    let newSeries;
    let newColors;

    if (key === 'numberOfMarkers') {
      this._changePoints(parseInt(value));
    }

    if (serieKey[0].indexOf("serieName") === 0) {
      newSeries = this.props.model.series;
      newSeries[parseInt(serieKey[1])].name = value;
      line = Object.assign({}, this.props.model, {series: newSeries});
    }

    if (serieKey[0].indexOf("seriePoint") === 0) {
      newSeries = this.props.model.series;
      newSeries[parseInt(serieKey[1])].data[parseInt(serieKey[2])] = parseFloat(value);
      line = Object.assign({}, this.props.model, {series: newSeries});
    }

    if (serieKey[0].indexOf("color") === 0) {
      newColors = this.props.colors;
      newColors[serieKey[1]] = value;
      lineColors = Object.assign({}, this.props.colors, newColors);
      delete line[key];
    }

    this.props.setStateModal({
      line,
      lineColors,
      isFirstEditing: false
    });
  }

  _changePoints = (newPointSize) => {
    let line = this.props.model;
    let oldPointSize = line.numberOfMarkers;
    let series = line.series;

    let removePoint = (numberOfMarkers) => {
      for (let i=0;i < series.length; i++) {
        series[i].data = series[i].data.slice(0, numberOfMarkers);
      }

      line.numberOfMarkers = numberOfMarkers;
    }

    let addPoint = (numberOfMarkers) => {
      for (let i=0;i < series.length; i++) {
        series[i].data = series[i].data.concat(new Array(numberOfMarkers - oldPointSize).fill(null));
      }
    }

    if (oldPointSize > newPointSize) {
      removePoint(newPointSize);
    } else {
      addPoint(newPointSize);
    }

    this.props.setStateModal({
      line,
      isFirstEditing: false
    });
  }

  _handlePointLineAdd = () => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let newData = new Array(this.props.model.numberOfMarkers).fill(null);
    let newSeries = this.props.model.series.concat([{
      name: "",
      data: newData
    }]);
    let line = Object.assign({}, this.props.model, {series: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      line,
      isFirstEditing: false
    });
  }

  _handlePointLineRemove = (index) => {
    let newSeries = this.props.model.series;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let line;

    newSeries.splice(index, 1);
    line = Object.assign({}, this.props.model, {series: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      line,
      isFirstEditing: false
    });
  }

  _renderLineFormPoints = () => {
    let series = this.props.model.series || [];
    let key = this.state.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <button
            className="bs-ui-button bs-ui-button--background-red bs-ui-button--small remove-button"
            onClick={() => this._handlePointLineRemove(index)}>remover</button>
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
          {serie.data.map(function(data, indexPoint) {
            return <input
              key={"point-" + this.props.chartID + "-" + index + "-" + indexPoint}
              type="text"
              name={"seriePoint-" + index + "-" + indexPoint}
              className="bs-ui-form-control__field point"
              placeholder="Marcador"
              onChange={this._onChange}
              defaultValue={data} />;
          }, this, index)}
          </div>
        </div>
      );
    }, this)
  }

  _renderLineForm = () => {
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
            className="bs-ui-form-control__label">Legenda Eixo Y</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="yAxisTitle"
            onChange={this._onChange}
            value={model.yAxisTitle} />
        </div>
        <div className="bs-ui-form-control point-start group">
          <label
            className="bs-ui-form-control__label">Ponto Inicial</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="startingPoint"
            onChange={this._onChange}
            value={model.startingPoint} />
        </div>
        <div className="point-size group">
          <label>Número de marcadores</label>
          <select
            name="numberOfMarkers"
            onChange={this._onChange}
            value={model.numberOfMarkers}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="bs-ui-form-control clear group">
          <label
            className="bs-ui-form-control__label">Séries</label>
          {this._renderLineFormPoints()}
          <div className="new-point clear">
            <button
              className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
              onClick={() => this._handlePointLineAdd()}>nova série</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this._renderLineForm();
  }
}

export const lineColors = [
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

export const line = {
  title: "",
  subtitle: "",
  yAxisTitle: "",
  startingPoint: 0,
  numberOfMarkers: 3,
  series: [{
    name: "",
    data: [null, null, null]
  }]
}
