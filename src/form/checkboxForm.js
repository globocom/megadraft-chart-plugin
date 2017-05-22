/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
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
