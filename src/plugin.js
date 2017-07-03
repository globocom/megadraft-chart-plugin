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
import { BaseFormConfig } from "./forms/Base";


function ButtonComponentWrapper ({...props}) {
  return (
    <Button {...props} themeName={Plugin.custom.themeName} />
  );
}

function BlockComponentWrapper ({...props}) {
  return (
    <Block {...props} themeName={Plugin.custom.themeName} />
  );
}

var Plugin = {
  title: __("Chart"),
  type: constants.PLUGIN_TYPE,
  buttonComponent: ButtonComponentWrapper,
  blockComponent: BlockComponentWrapper,
  custom: {
    baseFormConfig: BaseFormConfig,
    themeName: "default"
  },
  options: {
    defaultDisplay: "",
    displayOptions: []
  }
};

export default Plugin;
