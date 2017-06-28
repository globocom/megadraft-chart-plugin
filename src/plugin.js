/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";
import { BaseFormConfig } from "./forms/Base";
import Themes from "./themes";

export default {
  title: __("Chart"),
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  custom: {
    baseFormConfig: BaseFormConfig,
    themes: Themes
  },
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};
