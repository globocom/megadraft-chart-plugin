/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelLineChart: this.props.modelLineChart,
      modelColumnChart: this.props.modelColumnChart,
      modelPieChart: this.props.modelPieChart,
      serieKey: 0
    };

    this.serieKeyInterval = 100;
  }

  _getChartType() {
    let chartType = {
      line: {
        model: this.props.modelLineChart,
        render: this._renderLineForm,
        change: this._onChangeLine
      },
      column: {
        model: this.props.modelColumnChart,
        render: this._renderColumnForm,
        change: this._onChangeColumn
      },
      pie: {
        model: this.props.modelPieChart,
        render: this._renderPieForm,
        change: this._onChangePie
      }
    };

    return chartType[this.props.chartType];
  }

  _currentModel = () => {
    return this._getChartType().model;
  }

  _currentRender = () => {
    return this._getChartType().render;
  }

  _currentChange = () => {
    return this._getChartType().change;
  }

  _onChangeLine = (key, value) => {
    let modelLineChart = Object.assign({}, this.props.modelLineChart, {[key]: value});
    let serieKey = key.split('-');

    if (key === 'pointSize') {
      this._changePoints(parseInt(value));
    }

    if (serieKey[0].indexOf("serieName") === 0) {
      let newSeries = this.props.modelLineChart.series;
      newSeries[parseInt(serieKey[1])].name = value;
      modelLineChart = Object.assign({}, this.props.modelLineChart, {series: newSeries});
    }

    if (serieKey[0].indexOf("seriePoint") === 0) {
      let newSeries = this.props.modelLineChart.series;
      newSeries[parseInt(serieKey[1])].data[parseInt(serieKey[2])] = parseFloat(value);
      modelLineChart = Object.assign({}, this.props.modelLineChart, {series: newSeries});
    }

    this.props.setStateModal({
      modelLineChart,
      isFirstEditing: false
    });
  }

  _onChangeColumn = (key, value) => {
    let modelColumnChart = Object.assign({}, this.props.modelColumnChart, {[key]: value});
    let serieKey = key.split('-');

    if (serieKey[0].indexOf("serieName") === 0) {
      let newSeries = this.props.modelColumnChart.data;
      newSeries[parseInt(serieKey[1])][0] = value;
      modelColumnChart = Object.assign({}, this.props.modelColumnChart, {data: newSeries});
    }

    if (serieKey[0].indexOf("seriePoint") === 0) {
      let newSeries = this.props.modelColumnChart.data;
      newSeries[parseInt(serieKey[1])][1] = parseFloat(value);
      modelColumnChart = Object.assign({}, this.props.modelColumnChart, {data: newSeries});
    }

    this.props.setStateModal({
      modelColumnChart,
      isFirstEditing: false
    });
  }

  _onChangePie = (key, value) => {
    let modelPieChart = Object.assign({}, this.props.modelPieChart, {[key]: value});
    let serieKey = key.split('-');

    if (serieKey[0].indexOf("serieName") === 0) {
      let newSeries = this.props.modelPieChart.data;
      newSeries[parseInt(serieKey[1])].name = value;
      modelPieChart = Object.assign({}, this.props.modelPieChart, {data: newSeries});
    }

    if (serieKey[0].indexOf("seriePoint") === 0) {
      let newSeries = this.props.modelPieChart.data;
      newSeries[parseInt(serieKey[1])].y = parseFloat(value);
      modelPieChart = Object.assign({}, this.props.modelPieChart, {data: newSeries});
    }

    this.props.setStateModal({
      modelPieChart,
      isFirstEditing: false
    });
  }

  _changePoints = (newPointSize) => {
    let modelLineChart = this._currentModel();

    let oldPointSize = modelLineChart.pointSize;
    let series = modelLineChart.series;

    let removePoint = (pointSize) => {
      for (let i=0;i < series.length; i++) {
        series[i].data = series[i].data.slice(0, pointSize);
      }

      modelLineChart.pointSize = pointSize;
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
      modelLineChart,
      isFirstEditing: false
    });
  }

  _handlePointLineAdd = () => {
    let newData = [];
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    let newSeries;
    let modelLineChart;

    for (let i=0; i < this.props.modelLineChart.pointSize; i++) {
      newData.push(null);
    }

    newSeries = this.props.modelLineChart.series.concat([{name: "", data: newData}]);
    modelLineChart = Object.assign({}, this.props.modelLineChart, {series: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelLineChart,
      isFirstEditing: false
    });
  }

  _handlePointColumnAdd = () => {
    let newSeries = this.props.modelColumnChart.data.concat([[null, null]]);
    let modelColumnChart = Object.assign({}, this.props.modelColumnChart, {data: newSeries});
    let serieKey = this.state.serieKey + this.serieKeyInterval;

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelColumnChart,
      isFirstEditing: false
    });
  }

  _handlePointPieAdd = () => {
    let newSeries = this.props.modelPieChart.data.concat([{name: "", y: null}]);
    let modelPieChart = Object.assign({}, this.props.modelPieChart, {data: newSeries});
    let serieKey = this.state.serieKey + this.serieKeyInterval;

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelPieChart,
      isFirstEditing: false
    });
  }

  _handlePointLineRemove = (index) => {
    let newSeries = this.props.modelLineChart.series;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let modelLineChart;

    newSeries.splice(index, 1);
    modelLineChart = Object.assign({}, this.props.modelLineChart, {series: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelLineChart,
      isFirstEditing: false
    });
  }

  _handlePointColumnRemove = (index) => {
    let newSeries = this.props.modelColumnChart.data;
    let serieKey = this.state.serieKey - this.serieKeyInterval;

    newSeries.splice(index, 1);
    let modelColumnChart = Object.assign({}, this.props.modelColumnChart, {data: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelColumnChart,
      isFirstEditing: false
    });
  }

  _handlePointPieRemove = (index) => {
    let newSeries = this.props.modelPieChart.data
    let serieKey = this.state.serieKey - this.serieKeyInterval;

    newSeries.splice(index, 1);
    let modelPieChart = Object.assign({}, this.props.modelPieChart, {data: newSeries});

    this.setState({
      serieKey: serieKey
    });

    this.props.setStateModal({
      modelPieChart,
      isFirstEditing: false
    });
  }

  _onChange = (e) => {
    let key = e.target.attributes.name.nodeValue;
    let value = e.target.value;
    let change = this._currentChange();

    change(key, value);
  }

  _renderCommonForm = () => {
    let model = this._currentModel();

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
    let series = this.props.modelLineChart.series || [];
    let key = this.state.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <button
            className="bs-ui-button bs-ui-button--background-red bs-ui-button--small"
            onClick={() => this._handlePointLineRemove(index)}>remover</button>
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

  _renderColumnFormPoints = () => {
    let series = this.props.modelColumnChart.data || [];
    let key = this.state.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <button
            className="bs-ui-button bs-ui-button--background-red bs-ui-button--small"
            onClick={() => this._handlePointColumnRemove(index)}>remover</button>
          <input
            key={"name-" + this.props.chartID + "-" + index}
            type="text"
            name={"serieName-" + index}
            className="bs-ui-form-control__field points-name"
            placeholder="Legenda"
            onChange={this._onChange}
            defaultValue={serie[0]} />
          <div>
            <input
              key={"point-" + this.props.chartID + "-" + index}
              type="text"
              name={"seriePoint-" + index}
              className="bs-ui-form-control__field point"
              placeholder="Marcador"
              onChange={this._onChange}
              defaultValue={serie[1]} />
          </div>
        </div>
      );
    }, this)
  }

  _renderPieFormPoints = () => {
    let series = this.props.modelPieChart.data || [];
    let key = this.state.serieKey;

    return series.map(function(serie, index) {
      key++;
      return (
        <div key={"points-" + this.props.chartID + "-" + key} className="points clear">
          <button
            className="bs-ui-button bs-ui-button--background-red bs-ui-button--small"
            onClick={() => this._handlePointPieRemove(index)}>remover</button>
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

  _renderLineForm = () => {
    let model = this.props.modelLineChart;

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
        <div className="series clear group">
          <label>Séries</label>
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

  _renderColumnForm = () => {
    let model = this.props.modelColumnChart;

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
            defaultValue={model.yAxisTitle} />
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label">Nome da Série</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="nameColumn"
            onChange={this._onChange}
            value={model.nameColumn} />
        </div>
        <div className="series clear group">
          <label>Séries</label>
          {this._renderColumnFormPoints()}
          <div className="new-point clear">
            <button
              className="bs-ui-button bs-ui-button--background-blue bs-ui-button--small"
              onClick={() => this._handlePointColumnAdd()}>nova série</button>
          </div>
        </div>
      </div>
    );
  }

  _renderPieForm = () => {
    let model = this.props.modelPieChart;

    return (
      <div className="frame">
        <div>
          {this._renderCommonForm()}
        </div>
        <div className="bs-ui-form-control group">
          <label
            className="bs-ui-form-control__label">Nome da Série</label>
          <input
            type="text"
            className="bs-ui-form-control__field"
            name="namePie"
            onChange={this._onChange}
            value={model.namePie} />
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
    let render = this._currentRender();
    return render();
  }
}
