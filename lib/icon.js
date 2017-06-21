"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginIcon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.PlusIcon = PlusIcon;
exports.CloseIcon = CloseIcon;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PluginIcon = exports.PluginIcon = function (_React$Component) {
  _inherits(PluginIcon, _React$Component);

  function PluginIcon() {
    _classCallCheck(this, PluginIcon);

    return _possibleConstructorReturn(this, (PluginIcon.__proto__ || Object.getPrototypeOf(PluginIcon)).apply(this, arguments));
  }

  _createClass(PluginIcon, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        _extends({}, this.props, { width: "24px", height: "24px", viewBox: "0 0 24 24", version: "1.1" }),
        _react2.default.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
          _react2.default.createElement(
            "g",
            { id: "48", fillRule: "nonzero", fill: "#FFFFFF" },
            _react2.default.createElement(
              "g",
              { id: "icone-grafico", transform: "translate(6.000000, 7.000000)" },
              _react2.default.createElement("polygon", { id: "Shape", points: "7.875 4.93875 10.26 0.815625 11.233125 1.378125 8.29125 6.46875 4.629375 4.359375 1.94625 9 11.25 9 11.25 10.125 0 10.125 0 0 1.125 0 1.125 8.17875 4.21875 2.8125" })
            )
          )
        )
      );
    }
  }]);

  return PluginIcon;
}(_react2.default.Component);

function PlusIcon() {
  return _react2.default.createElement(
    "svg",
    { width: "24px", height: "24px", viewBox: "0 0 24 24", version: "1.1" },
    _react2.default.createElement("path", { fill: "#000000", d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" })
  );
}

function CloseIcon() {
  return _react2.default.createElement(
    "svg",
    { width: "24px", height: "24px", viewBox: "0 0 24 24", version: "1.1" },
    _react2.default.createElement("path", { fill: "#000000", d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })
  );
}