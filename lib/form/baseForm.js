"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonInitialData = exports.default = exports.BaseFormConfig = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _pointsForm = require("./pointsForm");

var _pointsForm2 = _interopRequireDefault(_pointsForm);

var _commonFields = require("./commonFields");

var _commonFields2 = _interopRequireDefault(_commonFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BaseFormConfig = exports.BaseFormConfig = {
  seriePointRegex: /^\-?(\d+(\.?\d*))?$/
};
// all unit tests for this regex in https://regex101.com/r/9iA7wC/2

var BaseForm = function (_Component) {
  _inherits(BaseForm, _Component);

  function BaseForm(props) {
    _classCallCheck(this, BaseForm);

    var _this = _possibleConstructorReturn(this, (BaseForm.__proto__ || Object.getPrototypeOf(BaseForm)).call(this, props));

    _this._changeSerieName = function (event, index) {
      var value = event.target.value;
      _this.updateChartData({ data: _defineProperty({}, index, { $merge: { name: value } }) });
    };

    _this._changeSeriePoint = function (event, index) {
      var indexPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = event.target.value;
      if (value.match(BaseFormConfig.seriePointRegex)) {
        _this.updateChartData({ data: _defineProperty({}, index, { value: { $merge: _defineProperty({}, indexPoint, value) } }) });
      }
    };

    _this._changeColor = function (event, index) {
      var value = event.target.value;
      var data = (0, _immutabilityHelper2.default)(_this.props.model, { themes: { colors: { $merge: _defineProperty({}, index, value) } } });
      _this.props.setStateModal(data);
    };

    _this._changeCommon = function (event) {
      var key = event.target.attributes.name.nodeValue;
      var value = event.target.value;
      _this.updateChartData(_defineProperty({}, key, { $set: value }));
    };

    _this._handlePointAdd = function () {
      var numberOfPointers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var serieKey = _this.state.serieKey + _this.serieKeyInterval;
      _this.setState({ serieKey: serieKey });

      var newItemData = { name: "", value: new Array(parseInt(numberOfPointers)).fill(null) };
      _this.updateChartData({ data: { $push: [newItemData] } });
    };

    _this._handlePointRemove = function (index) {
      var newSeries = _this.props.model.options.data;
      var serieKey = _this.state.serieKey - _this.serieKeyInterval;
      var colors = _this.props.model.themes.colors.slice();
      var options = void 0,
          themes = void 0;

      if (newSeries.length === 1) {
        return;
      }

      newSeries.splice(index, 1);
      options = Object.assign({}, _this.props.model.options, { data: newSeries });

      colors = colors.concat(colors.splice(index, 1));
      themes = Object.assign({}, _this.props.model.themes, { colors: colors });

      _this.setState({ serieKey: serieKey });
      _this.props.setStateModal({ options: options, themes: themes });
    };

    _this.state = {
      serieKey: 0
    };
    _this.serieKeyInterval = 100;
    return _this;
  }

  _createClass(BaseForm, [{
    key: "updateChartData",
    value: function updateChartData(newData) {
      this.props.setStateModal((0, _immutabilityHelper2.default)(this.props.model, { options: newData }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        (0, _commonFields2.default)(this.props.fields, this.props.model.options, this._changeCommon),
        this.props.children,
        _react2.default.createElement(_pointsForm2.default, {
          series: this.props.model.options.data || [],
          serieKey: this.state.serieKey,
          chartID: this.props.chartID,
          themes: this.props.model.themes,
          onChangeSerieName: this._changeSerieName,
          onChangeSeriePoint: this._changeSeriePoint,
          onChangeColor: this._changeColor,
          handlePointAdd: function handlePointAdd() {
            return _this2._handlePointAdd(_this2.props.model.options.numberOfMarkers);
          },
          handlePointRemove: this._handlePointRemove
        })
      );
    }
  }]);

  return BaseForm;
}(_react.Component);

exports.default = BaseForm;
var commonInitialData = exports.commonInitialData = {
  title: "",
  subtitle: "",
  credits: "",
  data: [{
    name: "",
    value: [null]
  }]
};