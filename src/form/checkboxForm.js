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
