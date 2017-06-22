/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

/* global __ */

import React from "react";

import { TextInputGroup } from "./inputs";

export const COMMON_FIELDS = [
  {
    name: "title",
    label: __("Title"),
    placeholder: "Ex.: " + __("USD to EUR exchange rate over time")
  },
  {
    name: "subtitle",
    label: __("Subtitle"),
    placeholder: "Ex.: " + __("Click and drag in the plot area to zoom in")
  },
  {
    name: "credits",
    label: __("Credits"),
    placeholder: "Ex.: IBGE"
  }
];

export default function CommonFieldsGroup(fields, model, onChange) {
  return (
    <div>
    {fields.map((field) => {
      return (
        <TextInputGroup
        key={field.name}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        onChange={onChange}
        defaultValue={model[field.name]}
        />
      );
    })}
    </div>
  );
}
