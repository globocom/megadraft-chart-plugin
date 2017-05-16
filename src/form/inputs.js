/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React from "react";

export function TextInput({name, label, placeholder, onChange, defaultValue, className}) {
  const classNameArray = ["bs-ui-form-control"];
  if (className) {
    classNameArray.push(className);
  }

  return (
    <div className={classNameArray.join(" ")}>
      <label className="bs-ui-form-control__label">{ label }</label>
      <input
        type="text"
        className="bs-ui-form-control__field"
        placeholder={placeholder || label}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
