"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMMON_FIELDS = undefined;
exports.default = CommonFieldsGroup;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Text = require("./inputs/Text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

var COMMON_FIELDS = exports.COMMON_FIELDS = [{
  name: "title",
  label: __("Title"),
  placeholder: "Ex.: " + __("USD to EUR exchange rate over time")
}, {
  name: "subtitle",
  label: __("Subtitle"),
  placeholder: "Ex.: " + __("Click and drag in the plot area to zoom in")
}, {
  name: "credits",
  label: __("Credits"),
  placeholder: "Ex.: IBGE"
}];

function CommonFieldsGroup(fields, model, onChange) {
  return _react2.default.createElement(
    "div",
    null,
    fields.map(function (field) {
      return _react2.default.createElement(_Text.TextInputGroup, {
        key: field.name,
        name: field.name,
        label: field.label,
        placeholder: field.placeholder,
        onChange: onChange,
        defaultValue: model[field.name]
      });
    })
  );
}