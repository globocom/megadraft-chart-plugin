"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = TextInput;
exports.TextInputGroup = TextInputGroup;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * License: MIT
                                                                                                                                                                                                                              */

function TextInput(_ref) {
  var name = _ref.name,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? "" : _ref$placeholder,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? "text" : _ref$type,
      onChange = _ref.onChange,
      defaultValue = _ref.defaultValue,
      className = _ref.className;

  var classNameArray = ["bs-ui-form-control__field"];
  if (className) {
    classNameArray.push(className);
  }
  return _react2.default.createElement("input", {
    type: type,
    className: classNameArray.join(" "),
    placeholder: placeholder,
    name: name,
    onChange: onChange,
    value: defaultValue || ""
  });
}

function TextInputGroup(_ref2) {
  var label = _ref2.label,
      className = _ref2.className,
      props = _objectWithoutProperties(_ref2, ["label", "className"]);

  var classNameArray = ["bs-ui-form-control"];
  if (className) {
    classNameArray.push(className);
  }

  return _react2.default.createElement(
    "div",
    { className: classNameArray.join(" ") },
    _react2.default.createElement(
      "label",
      { className: "bs-ui-form-control__label" },
      label
    ),
    _react2.default.createElement(TextInput, props)
  );
}