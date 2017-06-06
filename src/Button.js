/*
 * Copyright (c) 2017, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";
import {PluginIcon} from "./icon";
import constants from "./constants";
import {insertDataBlock} from "megadraft";
import ModalChart from "./ModalChart";

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.tenant = window.sessionStorage.tenantSelectedId || "default";
    this.state = {
      isEditing: false
    };

    this.onClick = ::this.onClick;
    this.onModalClose = ::this.onModalClose;
    this.onSave = ::this.onSave;
  }

  onClick(e) {
    let body = document.getElementsByTagName("body")[0];

    // temporario ate que o time backstage de solucao
    e.stopPropagation();

    body.classList.add("megadraft-modal--open");

    this.setState({
      isEditing: true
    });
  }

  onModalClose() {
    let body = document.getElementsByTagName("body")[0];

    body.classList.remove("megadraft-modal--open");

    if (this.state.isEditing) {
      this.setState({
        isEditing: false
      });
    }
  }

  onSave(chart) {
    this.setState({
      isEditing: false
    });
    const data = {
      type: constants.PLUGIN_TYPE,
      chart
    };

    this.props.onChange(insertDataBlock(this.props.editorState, data));
  }

  render() {
    return (
      <div>
        <button className={this.props.className} type="button" onClick={this.onClick} title="Gráfico">
          <PluginIcon className="sidemenu__button__icon" />
        </button>
        <ModalChart
          isOpen={this.state.isEditing}
          tenant={this.tenant}
          onCloseRequest={this.onModalClose}
          onSaveRequest={this.onSave}
        />
      </div>
    );
  }
}
