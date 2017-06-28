/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

function RadioButton({name, value, onChange, checked}) {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}

export function RadioButtonVertical({...props}) {
  return (
    <RadioButton
      {...props}
      name="noInverted"
      value={false}
    />
  );
}

export function RadioButtonHorizontal({...props}) {
  return (
    <RadioButton
      {...props}
      name="inverted"
      value={true}
    />
  );
}
