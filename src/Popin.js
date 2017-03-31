/*
 * Copyright (c) 2016, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightRawTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import classNames from "classnames";

import Form from './Form';
import Chart from './Chart';

injectTapEventPlugin();


export default class Popin extends Component {
  constructor(props) {
    super(props);

    Popin.childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    this.bodyNode;
    this.contentHeight = {};

    this.state = {
      chartType: 'line',
      applyChart: false,

      modelLine: {series: []},
      modelColumn: {series: []},
      modelPie: {series: []},

      muiTheme: getMuiTheme(lightRawTheme)
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    }
  }

  componentDidMount() {
    this.bodyNode = ReactDOM.findDOMNode(this.refs['body']);
    this.contentHeight = {minHeight: (this.bodyNode.clientHeight - 40) + 'px'};
  }

  setStatePopin = (dict) => {
    this.setState(dict);
  }

  _handleApplyChart() {
    this.bodyNode.scrollTop = 0;
    this.setState({
      applyChart: true
    });

    this.props.setStateBlock({
      popin: false,
    });
  }

  _handleChartType(chartType) {
    this.setState({
      chartType: chartType
    });
  }

  render() {
    let chartTypeClass = function(type) {
      return classNames(
        'tab-' + type, {
        selected: type === this.state.chartType
      });
    }.bind(this);

    let popinClass = function() {
      return classNames(
        'popin', {
        active: this.props.popin
      });
    }.bind(this);

    return (
      <section className={popinClass()}>
        <div className="block">
          <div className="header with-tabs">
            <a className="popin-close"></a>
            <ul className="nav nav-tabs">
                <li className={chartTypeClass('line')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('line')}>Linha</a>
                </li>
                <li className={chartTypeClass('column')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('column')}>Barra</a>
                </li>
                <li className={chartTypeClass('pie')}>
                  <a href="javascript:void(0)" onClick={(chartType) => this._handleChartType('pie')}>Pizza</a>
                </li>
            </ul>
          </div>
          <div ref="body" className="body list-body">
            <div className="grid">
              <div className="form" style={this.contentHeight}>
                <Form 
                  key={this.state.chartType}
                  modelLine={this.state.modelLine}
                  modelColumn={this.state.modelColumn}
                  modelPie={this.state.modelPie}
                  chartType={this.state.chartType}
                  setStatePopin={this.setStatePopin} />
              </div>
              <Chart 
                key={this.state.chartType}
                modelLine={this.state.modelLine}
                modelColumn={this.state.modelColumn}
                modelPie={this.state.modelPie}
                applyChart={this.state.applyChart}
                chartType={this.state.chartType}
                setStatePopin={this.setStatePopin}
                container={this.props.container} />
            </div>
          </div>
          <div className="footer">
            <button className="btn" onClick={() => this._handleApplyChart()}>aplicar</button>
          </div>
        </div>
      </section>
    );
  }
}
