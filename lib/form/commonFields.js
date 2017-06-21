"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMMON_FIELDS = undefined;
exports.default = CommonFieldsGroup;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _inputs = require("./inputs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

var COMMON_FIELDS = exports.COMMON_FIELDS = [{
  name: "title",
  label: "Título",
  placeholder: "Ex.: Veja histórico da taxa de analfabetismo no brasil"
}, {
  name: "subtitle",
  label: "Subtítulo",
  placeholder: "Ex.: Índice não apresentava um aumento desde 1997"
}, {
  name: "credits",
  label: "Fonte",
  placeholder: "Ex.: IBGE"
}];

function CommonFieldsGroup(fields, model, onChange) {
  return _react2.default.createElement(
    "div",
    null,
    fields.map(function (field) {
      return _react2.default.createElement(_inputs.TextInputGroup, {
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