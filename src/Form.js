/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class Form extends Component {
  constructor(props) {
    super(props);

    this.chartType = {
      line: {
        render: this._renderFormLine,
        change: this._onModelChangeLine
      },
      column: {
        render: this._renderFormColumn,
        change: this._onModelChangeColumn
      },
      pie: {
        render: this._renderFormPie,
        change: this._onModelChangePie
      }
    }

    this.state = {
      formLine: this._formLine(),
      formColumn: this._formColumn(),
      formPie: this._formPie(),

      schemaLine: this._schemaLine(),
      schemaColumn: this._schemaColumn(),
      schemaPie: this._schemaPie()
    }
  }

  _formLine() {
    return [
      "title",
      "subtitle",
      "yAxisTitle",
      {
        "key": "pointStart",
        "placeholder": "Número inicial da sua série de dados"
      },
      "qtdSeries",
      {
        "key": "series",
        "add": "Nova Série",
        "style": {
          "add": "btn-success"
        },
        "items": [
          "series[]"
        ]
      }
    ]
  }

  _schemaLine() {
    return {
      "type": "object",
      "title": "Chart Line",
      "properties": {
        "title": {
          "title": "Título",
          "type": "string"
        },
        "subtitle": {
          "title": "Subtítulo",
          "type": "string"
        },
        "yAxisTitle": {
          "title": "Legenda Eixo Y",
          "type": "string"
        },
        "pointStart": {
          "title": "Ponto Inicial",
          "type": "number"
        },
        "qtdSeries": {
          "type": "integer",
          "title": "Número de Marcadores",
          "default": 1
        },
        "series": {
          "title": "Séries",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "title": "Nome",
                "type": "string"
              }
            }
          }
        }
      }
    }
  }

  _formColumn() {
    return [
      "title",
      "subtitle",
      "yAxisTitle",
      "name",
      {
        "key": "series",
        "add": "Nova Série",
        "style": {
          "add": "btn-success"
        },
        "items": [
          "series[].legenda",
          "series[].serie"
        ]
      }
    ]
  }

  _schemaColumn() {
    return {
      "type": "object",
      "title": "Chart Column",
      "properties": {
        "title": {
          "title": "Título",
          "type": "string"
        },
        "subtitle": {
          "title": "Subtítulo",
          "type": "string"
        },
        "yAxisTitle": {
          "title": "Legenda Eixo Y",
          "type": "string"
        },
        "name": {
          "title": "Nome da Série",
          "type": "string"
        },
        "series": {
          "title": "Séries",
          "type": "array",
          "maxItems": 3,
          "items": {
            "type": "object",
            "properties": {
              "legenda": {
                "title": "Legenda",
                "type": "string"
              },
              "serie": {
                "title": "Marcador",
                "type": "string"
              }
            },
            "required": [
              "name"
            ]
          }
        }
      }
    }
  }

  _formPie() {
    return [
      "title",
      "subtitle",
      "name",
      "qtdSeries",
      {
        "key": "series",
        "add": "Nova Série",
        "style": {
          "add": "btn-success"
        },
        "items": [
          "series[]"
        ]
      }
    ]
  }

  _schemaPie() {
    return {
      "type": "object",
      "title": "Chart Pie",
      "properties": {
        "title": {
          "title": "Título",
          "type": "string"
        },
        "subtitle": {
          "title": "Subtítulo",
          "type": "string"
        },
        "name": {
          "title": "Nome da Série",
          "type": "string"
        },
        "series": {
          "title": "Séries",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "title": "Legenda",
                "type": "string"
              },
              "serie": {
                "title": "Ponto",
                "type": "string"
              }
            }
          }
        }
      }
    }
  }

  _onModelChangeLine = (key, val) => {
    let newModel = this.props.modelLine;
    newModel[key] = val;

    this.props.setStatePopin({
      modelLine: newModel
    });
  }

  _onModelChangeColumn(key, val) {
    let newModel = this.props.modelColumn;
    utils.selectOrSet(key, newModel, val);

    this.props.setStatePopin({
      modelColumn: newModel
    });
  }

  _onModelChangePie(key, val) {
    let newForm = this.state.formPie;
    let newSchema = this.state.schemaPie;
    let newModel = this.props.modelPie;

    newForm[4].items[0].title = '';

    utils.selectOrSet(key, newModel, val);

    this.props.setStatePopin({
      modelPie: newModel
    });
  }

  _onChange = (e) => {
    let chartType = this.props.chartType;
    let key = e.target.attributes.name.nodeValue;
    let val = e.target.value;

    this.chartType[this.props.chartType].change(key, val);
  }

  _renderFormLine() {
      return (
        <div>
          <label> Título </label>
          <input type="text" name="title" onChange={this._onChange}/>
          <label> Subtítulo </label>
          <input type="text" name="subtitle" onChange={this._onChange}/>
          <label> Legenda Eixo Y </label>
          <input type="text" name="yAxisTitle" onChange={this._onChange}/>
          <label> Ponto Inicial </label>
          <input type="text" name="pointStart" onChange={this._onChange}/>
          <label> Número de marcadores </label>
          <input type="text" name="qtdSeries" onChange={this._onChange}/>
          <label> Séries </label>
          <input type="text" name="name1" onChange={this._onChange}/>
          <input type="text" name="serie1" onChange={this._onChange}/>
        </div>
      );
  }
  renderFormColumn() {
    return (
      <div>
        <label> Título </label>
        <input type="text" name="title" onChange={this._onChange}/>
        <label> Subtítulo </label>
        <input type="text" name="subtitle" onChange={this._onChange}/>
        <label> Legenda Eixo Y </label>
        <input type="text" name="yAxisTitle" onChange={this._onChange}/>
      </div>
    )
  }
  renderFormPie() {
    return (
      <div>
        <label> Título </label>
        <input type="text" name="title" onChange={this._onChange}/>
        <label> Subtítulo </label>
        <input type="text" name="subtitle" onChange={this._onChange}/>
      </div>
    )
  }
  render() {
    let renderMarkup;
    if (this.props.chartType === 'line') {
      renderMarkup = this._renderFormLine();
    }
    return renderMarkup;
  }
}
