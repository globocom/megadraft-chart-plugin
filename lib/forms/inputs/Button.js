"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.FormCloseButton = FormCloseButton;
exports.FormPlusButton = FormPlusButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * License: MIT
                                                                                                                                                                                                                              */

var commonClasseNames = ["bs-ui-button", "bs-ui-button--small"];

function FormButton(_ref) {
  var className = _ref.className,
      name = _ref.name,
      onClick = _ref.onClick,
      children = _ref.children;

  return _react2.default.createElement(
    "button",
    {
      className: className,
      name: name,
      onClick: onClick },
    children
  );
}

function FormCloseButton(_ref2) {
  var _ref2$className = _ref2.className,
      className = _ref2$className === undefined ? "" : _ref2$className,
      props = _objectWithoutProperties(_ref2, ["className"]);

  var closeButtonClassNames = [].concat(commonClasseNames, _toConsumableArray(className), ["bs-ui-button--red", "chart-modal__form__btn-remove"]);

  return _react2.default.createElement(FormButton, _extends({}, props, {
    className: closeButtonClassNames.join(" ")
  }));
}

function FormPlusButton(_ref3) {
  var _ref3$className = _ref3.className,
      className = _ref3$className === undefined ? "" : _ref3$className,
      props = _objectWithoutProperties(_ref3, ["className"]);

  var plusButtonClassNames = [].concat(commonClasseNames, ["bs-ui-button--blue", "chart-modal__form__btn-add"]);

  return _react2.default.createElement(FormButton, _extends({}, props, {
    className: plusButtonClassNames.join(" ")
  }));
}