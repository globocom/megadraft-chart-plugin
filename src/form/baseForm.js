/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import update from "immutability-helper";

import CommonFields from "./commonFields";
import PointsForm from "./pointsForm";

export default class BaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serieKey: 0
    };
    this.serieKeyInterval = 100;
  }

  _changeSerieName = (event, index) => {
    let value = event.target.value;
    let data = {};

    data[this.props.chartType] = update(this.props.model, {data: {[index]: {$merge: {name: value}}}});
    this.props.setStateModal(data);
  }

  _changeSeriePoint = (event, index, indexPoint=0) => {
    let value = event.target.value;
    let data = {};
    data[this.props.chartType] = update(
      this.props.model,
      {data: {[index]: {value: {$merge: {[indexPoint]: parseFloat(value.replace(",", "."))}}}}}
    );
    this.props.setStateModal(data);
  }

  _changeColor = (event, index) => {
    let value = event.target.value;
    let data = {};

    data[this.props.chartType] = this.props.model;
    data[this.props.chartType + "Themes"] = update(this.props.themes, {colors: {$merge: {[index]: value} }});
    this.props.setStateModal(data);
  }

  _changeCommon = (event) => {
    let key = event.target.attributes.name.nodeValue;
    let value = event.target.value;
    let data = {};

    data[this.props.chartType] = update(this.props.model, {[key]: {$set: value}});
    this.props.setStateModal(data);
  }

  _handlePointAdd = (numberOfPointers=1) => {
    let serieKey = this.state.serieKey + this.serieKeyInterval;
    this.setState({serieKey});

    let newItemData = {name: "", value: new Array(parseInt(numberOfPointers)).fill(null)};
    let data = {};
    data[this.props.chartType] = update(this.props.model, {data: {$push: [newItemData]}});

    this.props.setStateModal(data);
  }

  _handlePointRemove = (index) => {
    let newSeries = this.props.model.data;
    let serieKey = this.state.serieKey - this.serieKeyInterval;
    let colors = this.props.themes.colors.slice();
    let newData, newThemes;

    if (newSeries.length === 1) {
      return;
    }

    newSeries.splice(index, 1);
    newData = Object.assign({}, this.props.model, {data: newSeries});

    colors = colors.concat(colors.splice(index, 1));
    newThemes = Object.assign({}, this.props.themes, {colors});

    this.setState({serieKey});

    let data = {};
    data[this.props.chartType] = newData;
    data[this.props.chartType + "Themes"] = newThemes;
    this.props.setStateModal(data);
  }

  render() {
    return (
      <div>
        <CommonFields
          onChange={this._changeCommon}
          model={this.props.model}
          excludeFields={this.props.excludeCommonFields}
        />
        { this.props.children }
        <PointsForm
          series={this.props.model.data || []}
          serieKey={this.state.serieKey}
          chartID={this.props.chartID}
          themes={this.props.themes}
          onChangeSerieName={this._changeSerieName}
          onChangeSeriePoint={this._changeSeriePoint}
          onChangeColor={this._changeColor}
          handlePointAdd={() => this._handlePointAdd(this.props.model.numberOfMarkers)}
          handlePointRemove={this._handlePointRemove}
        />
      </div>
    );
  }
}

export const defaultThemes = {
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
      "#aaeeee" // esta cor esta repetida
    ]
  }
};

export const defaultChartData = {
  title: "",
  subtitle: "",
  credits: "",
  data: [{
    name: "",
    value: [null]
  }]
};
