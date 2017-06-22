/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";
import { BaseFormConfig } from "./form/baseForm";


export default {
  title: "Gráfico",
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  baseFormConfig: BaseFormConfig,
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};
