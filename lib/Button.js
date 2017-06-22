"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _megadraft = require("megadraft");

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _icon = require("./icon");

var _ModalChart = require("./ModalChart");

var _ModalChart2 = _interopRequireDefault(_ModalChart);

var _BaseEditComponent2 = require("./BaseEditComponent");

var _BaseEditComponent3 = _interopRequireDefault(_BaseEditComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Button = function (_BaseEditComponent) {
  _inherits(Button, _BaseEditComponent);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.onSave = _this.onSave.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: "onSave",
    value: function onSave(chart) {
      this.onModalClose();
      var data = {
        type: _constants2.default.PLUGIN_TYPE,
        chart: chart
      };

      this.props.onChange((0, _megadraft.insertDataBlock)(this.props.editorState, data));
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "button",
          { className: this.props.className, type: "button", onClick: this.handleEdit, title: "Gr\xE1fico" },
          _react2.default.createElement(_icon.PluginIcon, { className: "sidemenu__button__icon" })
        ),
        _react2.default.createElement(_ModalChart2.default, {
          isOpen: this.state.isModalOpen,
          theme: this.theme,
          onCloseRequest: this.onModalClose,
          onSaveRequest: this.onSave
        })
      );
    }
  }]);

  return Button;
}(_BaseEditComponent3.default);

exports.default = Button;