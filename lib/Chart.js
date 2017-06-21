"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _highcharts = require("highcharts/highcharts");

var _highcharts2 = _interopRequireDefault(_highcharts);

var _HighchartsConnector = require("./HighchartsConnector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

require("highcharts/modules/exporting")(_highcharts2.default);

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart() {
    _classCallCheck(this, Chart);

    return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
  }

  _createClass(Chart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderChart();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._renderChart();
    }
  }, {
    key: "_renderChart",
    value: function _renderChart() {
      this.chart = (0, _HighchartsConnector.CreateChartByType)(this.props.type, this.props.id, this.props.themes.colors, this.props.data);
    }
  }, {
    key: "render",
    value: function render() {
      var className = "chart-preview";
      return _react2.default.createElement(
        "div",
        { className: className },
        _react2.default.createElement(
          "div",
          { className: className + "__header" },
          _react2.default.createElement(
            "div",
            { className: className + "__title" },
            this.props.data.title
          ),
          _react2.default.createElement(
            "div",
            { className: className + "__subtitle" },
            this.props.data.subtitle
          )
        ),
        _react2.default.createElement("div", { className: className + "__highcharts", id: this.props.id }),
        this.props.data.credits ? _react2.default.createElement(
          "div",
          { className: className + "__credits" },
          "Fonte: ",
          this.props.data.credits
        ) : ""
      );
    }
  }]);

  return Chart;
}(_react.Component);

exports.default = Chart;