/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import Button from "./Button";
import ChartBlock from "./Block";
import constants from "./constants";


export default {
  title: "Megadraft Backstage Chart",
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: ChartBlock,
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};
