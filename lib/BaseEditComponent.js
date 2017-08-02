"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BaseEditComponent = function (_Component) {
  _inherits(BaseEditComponent, _Component);

  function BaseEditComponent(props) {
    _classCallCheck(this, BaseEditComponent);

    var _this = _possibleConstructorReturn(this, (BaseEditComponent.__proto__ || Object.getPrototypeOf(BaseEditComponent)).call(this, props));

    _this.state = {
      isModalOpen: false
    };

    _this.handleEdit = _this.handleEdit.bind(_this);
    _this.onModalClose = _this.onModalClose.bind(_this);
    return _this;
  }

  _createClass(BaseEditComponent, [{
    key: "lockScroll",
    value: function lockScroll(e) {
      var body = document.getElementsByTagName("body")[0];
      // temporario ate que o time backstage de solucao
      if (e) {
        e.stopPropagation();
      }
      body.classList.add("megadraft-modal--open");
    }
  }, {
    key: "unlockScroll",
    value: function unlockScroll() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("megadraft-modal--open");
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(e) {
      this.lockScroll(e);
      this.setState({
        isModalOpen: true
      });
    }
  }, {
    key: "onModalClose",
    value: function onModalClose() {
      this.unlockScroll();
      this.setState({
        isModalOpen: false
      });
    }
  }]);

  return BaseEditComponent;
}(_react.Component);

exports.default = BaseEditComponent;