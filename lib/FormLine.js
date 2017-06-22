"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineInitial = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _baseForm = require("./form/baseForm");

var _baseForm2 = _interopRequireDefault(_baseForm);

var _commonFields = require("./form/commonFields");

var _icon = require("./icon");

var _buttonsForm = require("./form/buttonsForm");

var _inputs = require("./form/inputs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* global __ */

var lineFields = _commonFields.COMMON_FIELDS.concat([{
  name: "yAxisTitle",
  label: __("Y Axis Legend"),
  placeholder: "Ex.: " + __("Years")
}]);

var FormLine = function (_Component) {
  _inherits(FormLine, _Component);

  function FormLine() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormLine);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormLine.__proto__ || Object.getPrototypeOf(FormLine)).call.apply(_ref, [this].concat(args))), _this), _this._changeCategory = function (event, index) {
      var value = event.target.value;
      _this.props.setStateModal((0, _immutabilityHelper2.default)(_this.props.model, { options: { categories: { $merge: _defineProperty({}, index, value) } } }));
    }, _this._changeLabels = function (event) {
      _this.props.setStateModal((0, _immutabilityHelper2.default)(_this.props.model, { options: { labels: { $set: event.target.checked } } }));
    }, _this._addPoint = function () {
      var line = JSON.parse(JSON.stringify(_this.props.model));
      line.options.numberOfMarkers++;
      line.options.data.map(function (object) {
        object.value.push(null);
      });
      line.options.categories = line.options.categories.concat(new Array(1).fill(""));
      _this.props.setStateModal(line);
    }, _this._removePoint = function () {
      var line = JSON.parse(JSON.stringify(_this.props.model));
      line.options.numberOfMarkers--;
      if (line.options.numberOfMarkers === 0) {
        return;
      }
      line.options.data.map(function (object) {
        object.value.pop();
      });
      line.options.categories = line.options.categories.slice(0, line.options.numberOfMarkers);
      _this.props.setStateModal(line);
    }, _this._renderLineFormCategories = function () {
      var categories = _this.props.model.options.categories || [];
      var classNameFormPrefix = "chart-modal__form";

      return _react2.default.createElement(
        "div",
        { className: classNameFormPrefix + "__points-container" },
        categories.map(function (category, index) {
          var _this2 = this;

          return _react2.default.createElement(_inputs.TextInput, {
            key: "point-" + this.props.chartID + "-" + index,
            name: "category-" + index,
            className: classNameFormPrefix + "__point",
            placeholder: __("Category"),
            onChange: function onChange(event) {
              return _this2._changeCategory(event, index);
            },
            defaultValue: category
          });
        }, _this)
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormLine, [{
    key: "render",
    value: function render() {
      var options = this.props.model.options;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _baseForm2.default,
          {
            model: this.props.model,
            fields: lineFields,
            chartType: "line",
            chartID: this.props.chartID,
            setStateModal: this.props.setStateModal
          },
          _react2.default.createElement(
            "div",
            { className: "bs-ui-form-control" },
            _react2.default.createElement(
              "label",
              { className: "bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space" },
              _react2.default.createElement("input", {
                ref: "labels",
                type: "checkbox",
                name: "labels",
                value: "labels",
                checked: options.labels === true,
                onChange: this._changeLabels }),
              __("Make labels visible")
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "bs-ui-form-control" },
            _react2.default.createElement(
              "label",
              {
                className: "bs-ui-form-control__label chart-modal__form__label-category" },
              __("X Axis categories")
            ),
            _react2.default.createElement(
              "div",
              { className: "chart-modal__form__btn-group" },
              options.categories.length > 1 ? _react2.default.createElement(
                _buttonsForm.FormCloseButton,
                {
                  name: "removePoint",
                  onClick: this._removePoint },
                _react2.default.createElement(_icon.CloseIcon, null),
                " ",
                __("Remove")
              ) : "",
              _react2.default.createElement(
                _buttonsForm.FormPlusButton,
                {
                  name: "addPoint",
                  onClick: this._addPoint },
                _react2.default.createElement(_icon.PlusIcon, null),
                " ",
                __("Add")
              )
            ),
            this._renderLineFormCategories()
          )
        )
      );
    }
  }]);

  return FormLine;
}(_react.Component);

exports.default = FormLine;
var lineInitial = exports.lineInitial = _extends({}, _baseForm.commonInitialData, {
  data: [{
    name: "",
    value: [null, null, null]
  }],
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 3,
  categories: ["", "", ""]
});