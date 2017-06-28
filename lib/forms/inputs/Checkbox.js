"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = Checkbox;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Checkbox(_ref) {
  var checked = _ref.checked,
      onChange = _ref.onChange;

  return _react2.default.createElement("input", {
    type: "checkbox",
    name: "percentage",
    value: "percentage",
    checked: checked,
    onChange: onChange
  });
} /*
   * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
   *
   * License: MIT
   */