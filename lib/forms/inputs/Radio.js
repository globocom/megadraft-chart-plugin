"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.RadioButtonVertical = RadioButtonVertical;
exports.RadioButtonHorizontal = RadioButtonHorizontal;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * License: MIT
                                                                                                                                                                                                                              */

function RadioButton(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      checked = _ref.checked;

  return _react2.default.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange
  });
}

function RadioButtonVertical(_ref2) {
  var props = _objectWithoutProperties(_ref2, []);

  return _react2.default.createElement(RadioButton, _extends({}, props, {
    name: "noInverted",
    value: false
  }));
}

function RadioButtonHorizontal(_ref3) {
  var props = _objectWithoutProperties(_ref3, []);

  return _react2.default.createElement(RadioButton, _extends({}, props, {
    name: "inverted",
    value: true
  }));
}