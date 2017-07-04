"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require("./inputs/Button");

var _Text = require("./inputs/Text");

var _icon = require("./../icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* global __ */

function hexColorGenerator() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var PointsForm = function (_Component) {
  _inherits(PointsForm, _Component);

  function PointsForm() {
    _classCallCheck(this, PointsForm);

    return _possibleConstructorReturn(this, (PointsForm.__proto__ || Object.getPrototypeOf(PointsForm)).apply(this, arguments));
  }

  _createClass(PointsForm, [{
    key: "renderPointInputList",
    value: function renderPointInputList(serie, index, key) {
      return serie.value.map(function (data, indexPoint) {
        var _this2 = this;

        return _react2.default.createElement(_Text.TextInput, {
          key: "point-" + this.props.chartID + "-" + index + "-" + indexPoint + "-" + key,
          name: "seriePoint-" + index + "-" + indexPoint,
          className: "chart-modal__form__point",
          placeholder: __("Value"),
          onChange: function onChange(event) {
            return _this2.props.onChangeSeriePoint(event, index, indexPoint);
          },
          defaultValue: data
        });
      }, this, index);
    }
  }, {
    key: "renderAddPointButton",
    value: function renderAddPointButton() {
      return _react2.default.createElement(
        "div",
        { className: "chart-modal__form__btn-group" },
        _react2.default.createElement(
          _Button.FormPlusButton,
          {
            name: "handlePointAdd",
            onClick: this.props.handlePointAdd },
          _react2.default.createElement(_icon.PlusIcon, null),
          " ",
          __("Add")
        )
      );
    }
  }, {
    key: "renderRemovePointButton",
    value: function renderRemovePointButton(index) {
      var _this3 = this;

      return _react2.default.createElement(
        "div",
        { className: "chart-modal__form__btn-group" },
        _react2.default.createElement(
          _Button.FormCloseButton,
          {
            name: "handlePointRemove-" + index,
            onClick: function onClick() {
              return _this3.props.handlePointRemove(index);
            } },
          _react2.default.createElement(_icon.CloseIcon, null),
          " ",
          __("Remove")
        )
      );
    }
  }, {
    key: "renderFormPoints",
    value: function renderFormPoints() {
      var classNamePrefix = "chart-modal__form__points";
      var series = this.props.series || [];
      var key = this.props.serieKey;

      return series.map(function (serie, index) {
        var _this4 = this;

        key++;

        while (!this.props.themes.colors[index]) {
          this.props.themes.colors.push(hexColorGenerator());
        }

        return _react2.default.createElement(
          "div",
          { key: "points-" + this.props.chartID + "-" + key, className: classNamePrefix },
          series.length > 1 ? this.renderRemovePointButton(index) : "",
          _react2.default.createElement(
            "div",
            { className: classNamePrefix + "-header" },
            _react2.default.createElement(_Text.TextInput, {
              key: "name-" + this.props.chartID + "-" + index,
              name: "serieName-" + index,
              className: classNamePrefix + "-name",
              placeholder: __("Serie name"),
              onChange: function onChange(event) {
                return _this4.props.onChangeSerieName(event, index);
              },
              defaultValue: serie.name || serie[0] }),
            _react2.default.createElement(_Text.TextInput, {
              key: "color-" + this.props.chartID + "-" + index,
              type: "color",
              name: "color-" + index,
              className: classNamePrefix + "-color",
              placeholder: __("Color"),
              onChange: function onChange(event) {
                return _this4.props.onChangeColor(event, index);
              },
              defaultValue: this.props.themes.colors[index] })
          ),
          _react2.default.createElement(
            "div",
            { className: classNamePrefix + "-container" },
            this.renderPointInputList(serie, index, key)
          )
        );
      }, this);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "bs-ui-form-control" },
        _react2.default.createElement(
          "label",
          { className: "bs-ui-form-control__label" },
          __("Series")
        ),
        this.renderFormPoints(),
        this.renderAddPointButton()
      );
    }
  }]);

  return PointsForm;
}(_react.Component);

exports.default = PointsForm;


PointsForm.propTypes = {
  series: _propTypes2.default.array,
  serieKey: _propTypes2.default.number,
  chartID: _propTypes2.default.string,
  themes: _propTypes2.default.object,
  onChangeSeriePoint: _propTypes2.default.func,
  onChangeSerieName: _propTypes2.default.func,
  onChangeColor: _propTypes2.default.func
};