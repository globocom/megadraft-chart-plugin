"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _megadraft = require("megadraft");

var _ModalChart = require("./ModalChart");

var _ModalChart2 = _interopRequireDefault(_ModalChart);

var _Chart = require("./Chart");

var _Chart2 = _interopRequireDefault(_Chart);

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

var BlockContent = _megadraft.MegadraftPlugin.BlockContent,
    BlockData = _megadraft.MegadraftPlugin.BlockData,
    CommonBlock = _megadraft.MegadraftPlugin.CommonBlock;

var Block = function (_BaseEditComponent) {
  _inherits(Block, _BaseEditComponent);

  function Block(props) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

    _this.onSave = _this.onSave.bind(_this);

    _this.actions = [{ "key": "edit", "icon": _megadraft.MegadraftIcons.EditIcon, "action": _this.handleEdit }, { "key": "delete", "icon": _megadraft.MegadraftIcons.DeleteIcon, "action": _this.props.container.remove }];
    return _this;
  }

  _createClass(Block, [{
    key: "_getChartID",
    value: function _getChartID() {
      return this.props.container.props.offsetKey.split("-")[0];
    }
  }, {
    key: "onSave",
    value: function onSave(chart) {
      this.onModalClose();
      this.props.container.updateData({ chart: chart });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          CommonBlock,
          _extends({}, this.props, { actions: this.actions }),
          _react2.default.createElement(
            BlockContent,
            null,
            this.props.data && this.props.data.chart && _react2.default.createElement(_Chart2.default, {
              id: "chart-" + this._getChartID(),
              type: this.props.data.chart.type,
              themes: this.props.data.chart.themes,
              data: this.props.data.chart.options
            })
          ),
          _react2.default.createElement(BlockData, null)
        ),
        _react2.default.createElement(_ModalChart2.default, {
          isOpen: this.state.isModalOpen,
          chartID: this._getChartID(),
          tenant: this.tenant,
          chart: this.props.data.chart,
          onCloseRequest: this.onModalClose,
          onSaveRequest: this.onSave
        })
      );
    }
  }]);

  return Block;
}(_BaseEditComponent3.default);

exports.default = Block;