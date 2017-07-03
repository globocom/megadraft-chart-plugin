/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import {Component} from "react";

import Themes from "./themes";

export default class BaseEditComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.handleEdit = ::this.handleEdit;
    this.onModalClose = ::this.onModalClose;
  }

  getCurrentTheme() {
    var themeName = this.props.themeName || "default";
    return Themes[themeName] || Themes.default;
  }

  handleEdit(e) {
    let body = document.getElementsByTagName("body")[0];
    // temporario ate que o time backstage de solucao
    if (e) {
      e.stopPropagation();
    }
    body.classList.add("megadraft-modal--open");

    this.setState({
      isModalOpen: true
    });
  }

  onModalClose() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("megadraft-modal--open");

    this.setState({
      isModalOpen: false
    });
  }
}
