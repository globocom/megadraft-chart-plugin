/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";
import Popin from './Popin';

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleEdit = ::this._handleEdit;

    this.actions = [
      {"key": "edit", "icon": MegadraftIcons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];

    this.state = {
      popin: false
    }
  }

  componentDidMount() {
    // ReactDOM.render(
    //   <Popin
    //     setStateBlock={this.setStateBlock}
    //     popin={this.state.popin}
    //     container={this.props.container} />,
    //   document.getElementById("generic-box")
    // );
  }

  componentDidUpdate() {
    ReactDOM.render(
      <Popin
        setStateBlock={this.setStateBlock}
        popin={this.state.popin}
        container={this.props.container} />,
      document.getElementById("generic-box")
    );
  }

  _handleEdit() {
    this.setState({
      popin: true
    });
  }

  _handleCaptionChange(event) {
    this.props.container.updateData({caption: event.target.value});
  }

  setStateBlock = (dict) => {
    this.setState(dict);
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <div id="chart"></div>
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={this._handleCaptionChange} />
        </BlockData>
      </CommonBlock>
    );
  }
}
