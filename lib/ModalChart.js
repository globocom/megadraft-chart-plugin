"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _backstageModal = require("backstage-modal");

var _backstageModal2 = _interopRequireDefault(_backstageModal);

var _backstageTabs = require("backstage-tabs");

var _backstageTabs2 = _interopRequireDefault(_backstageTabs);

var _Chart = require("./Chart");

var _Chart2 = _interopRequireDefault(_Chart);

var _FormLine = require("./FormLine");

var _FormLine2 = _interopRequireDefault(_FormLine);

var _FormColumn = require("./FormColumn");

var _FormColumn2 = _interopRequireDefault(_FormColumn);

var _FormPie = require("./FormPie");

var _FormPie2 = _interopRequireDefault(_FormPie);

var _themes = require("./themes");

var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <httpss://github.com/globocom/megadraft-table-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FormByChartType = {
  line: _FormLine2.default,
  column: _FormColumn2.default,
  pie: _FormPie2.default
};

var TabsByChartType = [{
  value: "line",
  label: "Linha"
}, {
  value: "column",
  label: "Barra"
}, {
  value: "pie",
  label: "Pizza"
}];

var ModalChart = function (_Component) {
  _inherits(ModalChart, _Component);

  function ModalChart(props) {
    _classCallCheck(this, ModalChart);

    var _this = _possibleConstructorReturn(this, (ModalChart.__proto__ || Object.getPrototypeOf(ModalChart)).call(this, props));

    _this.state = _this.getInitialChartState();

    _this.onSaveRequest = _this.onSaveRequest.bind(_this);
    _this.setStateModal = _this.setStateModal.bind(_this);
    return _this;
  }

  _createClass(ModalChart, [{
    key: "getInitialChartState",
    value: function getInitialChartState() {
      return {
        chartType: "line",
        line: {
          themes: _themes2.default[this.props.tenant] || _themes2.default.default,
          options: _FormLine.lineInitial
        },
        column: {
          themes: _themes2.default[this.props.tenant] || _themes2.default.default,
          options: _FormColumn.columnInitial
        },
        pie: {
          themes: _themes2.default[this.props.tenant] || _themes2.default.default,
          options: _FormPie.pieInitial
        }
      };
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      var state = this.getInitialChartState();
      if (this.props.chart) {
        state[this.props.chart.type].options = Object.assign({}, this.props.chart.options);
        state[this.props.chart.type].themes = Object.assign({}, this.props.chart.themes);
        state.chartType = this.props.chart.type;
      }
      this.setState(state);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.isOpen || this.props.isOpen || false;
    }
  }, {
    key: "handleChartType",
    value: function handleChartType(chartType) {
      this.setState({ chartType: chartType });
    }
  }, {
    key: "_encodeOptimizedSVGDataUri",
    value: function _encodeOptimizedSVGDataUri(svgString) {
      var uriPayload = encodeURIComponent(svgString.replace(/\n+/g, "")) // remove newlines and encode URL-unsafe characters
      .replace(/%20/g, " ") // put spaces back in
      .replace(/%3D/g, "=") // ditto equals signs
      .replace(/%3A/g, ":") // ditto colons
      .replace(/%2F/g, "/") // ditto slashes
      .replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)

      return uriPayload;
    }
  }, {
    key: "onSaveRequest",
    value: function onSaveRequest() {
      var themes = this.state[this.state.chartType].themes;
      var options = this.state[this.state.chartType].options;
      var svgData = this._encodeOptimizedSVGDataUri(this.chartComponent.chart.getSVG());

      this.props.onSaveRequest({
        type: this.state.chartType,
        themes: themes,
        options: options,
        svg: svgData
      });
    }
  }, {
    key: "setStateModal",
    value: function setStateModal(data) {
      var newState = {};
      newState[this.state.chartType] = data;
      this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentChartType = this.state.chartType;
      var FormComponent = FormByChartType[currentChartType];
      return _react2.default.createElement(
        _backstageModal2.default,
        { className: "chart-modal",
          title: "Gr\xE1fico",
          isOpen: this.props.isOpen,
          onCloseRequest: this.props.onCloseRequest,
          width: "98%",
          height: "96%" },
        _react2.default.createElement(
          _backstageModal.ModalBody,
          { ref: "body" },
          _react2.default.createElement(
            "div",
            { className: "chart-modal__form" },
            _react2.default.createElement(_backstageTabs2.default, {
              tabs: TabsByChartType, activeTab: currentChartType,
              onClickTab: function onClickTab(clickedTab) {
                return _this2.handleChartType(clickedTab.value);
              }
            }),
            _react2.default.createElement(FormComponent, {
              key: "form-" + currentChartType + "-" + this.props.chartID,
              model: this.state[currentChartType],
              chartID: this.props.chartID,
              setStateModal: this.setStateModal })
          ),
          _react2.default.createElement(
            "div",
            { className: "chart-modal__chart" },
            _react2.default.createElement(_Chart2.default, {
              id: "chart-modal__preview",
              key: "chart-" + currentChartType + "-" + this.props.chartID,
              ref: function ref(chartComponent) {
                _this2.chartComponent = chartComponent;
              },
              themes: this.state[currentChartType].themes,
              data: this.state[currentChartType].options,
              type: currentChartType })
          )
        ),
        _react2.default.createElement(
          _backstageModal.ModalFooter,
          null,
          _react2.default.createElement(
            "button",
            {
              className: "chart-add-button bs-ui-button bs-ui-button--background-blue bs-ui-button--small",
              onClick: this.onSaveRequest },
            "aplicar"
          )
        )
      );
    }
  }]);

  return ModalChart;
}(_react.Component);

exports.default = ModalChart;