/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

export function Checkbox({checked, onChange}) {
  return (
    <input
      type="checkbox"
      name="percentage"
      value="percentage"
      checked={checked}
      onChange={onChange}
    />
  );
}
