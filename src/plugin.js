/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import React from "react";

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";
import Themes from "./themes";
import { BaseFormConfig } from "./forms/Base";

function ComponentThemeWrapperFactory(ComponentWrapped) {
  return function ({...props}) {
    return (
      <ComponentWrapped {...props} theme={Plugin.custom.theme || Themes.default} />
    );
  };
}

var Plugin = {
  title: __("Chart"),
  type: constants.PLUGIN_TYPE,
  buttonComponent: ComponentThemeWrapperFactory(Button),
  blockComponent: ComponentThemeWrapperFactory(Block),
  custom: {
    baseFormConfig: BaseFormConfig
  },
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};

export default Plugin;
