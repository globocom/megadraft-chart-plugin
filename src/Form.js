/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";

import {SchemaForm, utils} from "react-schema-form";


export default class Form extends Component {
  constructor(props) {
    super(props);

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

  _getChartType() {
    let chartType = this.props.chartType;
    let schema, form, model;

    switch(chartType) {
      case 'line':
        schema = this.state.schemaLine;
        form = this.state.formLine;
        model = this.props.modelLine;
        return {schema, form, model};
      case 'column':
        schema = this.state.schemaColumn;
        form = this.state.formColumn;
        model = this.props.modelColumn;
        return {schema, form, model};
      case 'pie':
        schema = this.state.schemaPie;
        form = this.state.formPie;
        model = this.props.modelPie;
        return {schema, form, model};
    }
  }

  _onModelChangeLine(key, val) {
    let newForm = this.state.formLine;
    let newSchema = this.state.schemaLine;
    let newModel = this.props.modelLine;
    let serieSize = this.props.modelLine.qtdSeries;
    let keySerie;
    let title;
    let hasKeySerie;

    let removePoint = (index) => {
      keySerie = "serie" + index;
      delete newSchema.properties.series.items.properties[keySerie];
      delete newForm[5].items[0].items[index];
      newForm[5].items[0].items.length = index;
      delete newForm[5].items[0].schema.properties[keySerie];

      for (let i=0; i < this.props.modelLine.series.length; i++) {
        delete newModel.series[i][keySerie]
      }
    }

    let addPoint = (index) => {
      keySerie = "serie" + index;
      title = "Marcador " + index;
      hasKeySerie = newSchema.properties.series.items.properties.hasOwnProperty(keySerie);

      if (!hasKeySerie) {
        newSchema.properties.series.items.properties[keySerie] = {
          title: title, type: "string"
        };

        newForm[5].items[0].items.push({
          "key": [
            "series", 
            "", 
            keySerie
          ],
          "schema": {
            "title": title, 
            "type":"string"
          },
          "title": title,
          "type":"text"
        });

        newForm[5].items[0].schema.properties[keySerie] = {
          title: title, type: "string"
        };
      }

      newForm[5].items[0].title = '';
    }

    if (key.constructor === Array && key[0] === 'qtdSeries') {
      if (val <= 0) {
        val = 1;
      }

      if (serieSize > val) {
        for (let i=serieSize; i > val; i--) {
          removePoint(i);
        }
      } else {
        for (let i = 1; i <= val; i++) {
          addPoint(i);
        }
      }
    }

    utils.selectOrSet(key, newModel, val);

    this.setState({
      formLine: newForm,
      schemaLine: newSchema
    });

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

  _onModelChange(key, val) {
    let chartType = this.props.chartType;

    switch(chartType) {
      case 'line':
        this._onModelChangeLine(key, val);
        break;
      case 'column':
        this._onModelChangeColumn(key, val);
        break;
      case 'pie':
        this._onModelChangePie(key, val);
        break;
    }
  }

  render() {
    const {schema, form, model} = this._getChartType();

    return <SchemaForm key={this.props.chartType} schema={schema} form={form} model={model} onModelChange={(key, val) => this._onModelChange(key, val)} />
  }
}
