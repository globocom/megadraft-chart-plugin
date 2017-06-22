"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _Block = require("./Block");

var _Block2 = _interopRequireDefault(_Block);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _baseForm = require("./form/baseForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

exports.default = {
  title: "Gráfico",
  type: _constants2.default.PLUGIN_TYPE,
  buttonComponent: _Button2.default,
  blockComponent: _Block2.default,
  baseFormConfig: _baseForm.BaseFormConfig,
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};