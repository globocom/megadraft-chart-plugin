/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import {Component} from "react";
import update from "immutability-helper";

export default class BaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serieKey: 0
    };
    this.serieKeyInterval = 100;
    this.chartType = "default";
  }

  _getKeyValue = (event) => {
    let key = event.target.attributes.name.nodeValue;
    let serieKey = key.split("-");
    return {key: key, value: event.target.value, index: parseInt(serieKey[1])};
  }

  _changeSerieName = (event) => {
    let {value, index} = this._getKeyValue(event);
    let data = {};
    data[this.chartType] = update(this.props.model, {data: {[index]: {$merge: {name: value}}}});
    return data;
  }

  _changeSeriePoint = (event) => {
    let {value, index} = this._getKeyValue(event);
    let data = {};
    data[this.chartType] = update(this.props.model, {data: {[index]: {$merge: {y: parseFloat(value.replace(",", "."))}}}});
    return data;
  }

  _changeColor = (event) => {
    let {value, index} = this._getKeyValue(event);
    let data = {};
    data[this.chartType] = this.props.model;
    data[this.chartType + "Themes"] = update(this.props.themes, {colors: {$merge: {[index]: value} }});
    return data;
  }

  _changeCommon = (event) => {
    let {key, value} = this._getKeyValue(event);
    let data = {};
    data[this.chartType] = update(this.props.model, {[key]: {$set: value}});
    return data;
  }

  _change = (method) => (event) => {
    this.props.setStateModal({...method(event), isFirstEditing: false});
  }
}

export const Themes = {
  "default": {
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
