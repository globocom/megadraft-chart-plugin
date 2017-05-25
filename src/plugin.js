/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";


export default {
  title: "Grafico",
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};
