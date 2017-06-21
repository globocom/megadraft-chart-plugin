"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pieInitial = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _baseForm = require("./form/baseForm");

var _baseForm2 = _interopRequireDefault(_baseForm);

var _commonFields = require("./form/commonFields");

var _checkboxForm = require("./form/checkboxForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var pieFields = _commonFields.COMMON_FIELDS.concat([{ name: "name",
  label: "Legenda das séries",
  placeholder: "Ex.: Meses"
}]);

var FormPie = function (_Component) {
  _inherits(FormPie, _Component);

  function FormPie() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormPie);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormPie.__proto__ || Object.getPrototypeOf(FormPie)).call.apply(_ref, [this].concat(args))), _this), _this._changePercentage = function (event) {
      var data = (0, _immutabilityHelper2.default)(_this.props.model, { options: { percentage: { $set: event.target.checked } } });
      _this.props.setStateModal(data);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormPie, [{
    key: "render",
    value: function render() {
      var options = this.props.model.options;
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _baseForm2.default,
          {
            model: this.props.model,
            fields: pieFields,
            themes: this.props.themes,
            chartType: "pie",
            chartID: this.props.chartID,
            setStateModal: this.props.setStateModal
          },
          _react2.default.createElement(
            "div",
            { className: "bs-ui-form-control" },
            _react2.default.createElement(
              "label",
              { className: "bs-ui-checkbox bs-ui-checkbox--small checkbox-label-space" },
              _react2.default.createElement(_checkboxForm.Checkbox, {
                checked: options.percentage === true,
                onChange: this._changePercentage
              }),
              "Calcular percentual automaticamente"
            )
          )
        )
      );
    }
  }]);

  return FormPie;
}(_react.Component);

exports.default = FormPie;
var pieInitial = exports.pieInitial = _extends({}, _baseForm.commonInitialData, {
  name: "",
  percentage: false
});