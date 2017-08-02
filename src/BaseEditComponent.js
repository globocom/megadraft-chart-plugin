/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import {Component} from "react";

export default class BaseEditComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.handleEdit = ::this.handleEdit;
    this.onModalClose = ::this.onModalClose;
  }

  lockScroll(e) {
    let body = document.getElementsByTagName("body")[0];
    // temporario ate que o time backstage de solucao
    if (e) {
      e.stopPropagation();
    }
    body.classList.add("megadraft-modal--open");
  }

  unlockScroll() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("megadraft-modal--open");
  }

  handleEdit(e) {
    this.lockScroll(e);
    this.setState({
      isModalOpen: true
    });
  }

  onModalClose() {
    this.unlockScroll();
    this.setState({
      isModalOpen: false
    });
  }
}
