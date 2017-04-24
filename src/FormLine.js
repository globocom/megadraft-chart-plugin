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
    let serieKey = key.split('-');
    let newSeries;

    if (key === 'pointSize') {
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
      newSeries = this.props.model.series;
      newSeries["color"] = value;
      line = Object.assign({}, this.props.model, {series: newSeries});
    }

    this.props.setStateModal({
      line,
      isFirstEditing: false
    });
  }

  _changePoints = (newPointSize) => {
    let line = this.props.model;
    let oldPointSize = line.pointSize;
    let series = line.series;

    let removePoint = (pointSize) => {
      for (let i=0;i < series.length; i++) {
        series[i].data = series[i].data.slice(0, pointSize);
      }

      line.pointSize = pointSize;
    }

    let addPoint = (pointSize) => {
      for (let i=0;i < series.length; i++) {
        series[i].data = series[i].data.concat(new Array(pointSize - oldPointSize).fill(null));
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
    let newData = new Array(this.props.model.pointSize).fill(null);
    let newSeries = this.props.model.series.concat([{
      color: this.props.colors[this.props.model.series.length],
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

  _renderCommonForm = () => {
    let model = this.props.model;

    return (
      <div>
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
      </div>
    );
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
        

        {this._renderCommonForm()}


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
            name="pointStart"
            onChange={this._onChange}
            value={model.pointStart} />
        </div>
        <div className="point-size group">
          <label>Número de marcadores</label>
          <select
            name="pointSize"
            onChange={this._onChange}
            value={model.pointSize}>
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
