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

var _Base = require("./forms/Base");

var _themes = require("./themes");

var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  title: __("Chart"),
  type: _constants2.default.PLUGIN_TYPE,
  buttonComponent: _Button2.default,
  blockComponent: _Block2.default,
  custom: {
    baseFormConfig: _Base.BaseFormConfig,
    themes: _themes2.default
  },
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
}; /*
    * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
    *
    * License: MIT
    */

/* global __ */