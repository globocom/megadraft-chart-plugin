/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React from "react";

export function TextInput({name, placeholder="", onChange, defaultValue, className}) {
  let classNameArray = ["bs-ui-form-control__field"];
  if (className) {
    classNameArray.push(className);
  }

  return (
    <input
      type="text"
      className={classNameArray.join(" ")}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}

export function TextInputGroup({label, className, ...props}) {
  let classNameArray = ["bs-ui-form-control"];
  if (className) {
    classNameArray.push(className);
  }

  return (
    <div className={classNameArray.join(" ")}>
      <label className="bs-ui-form-control__label">{ label }</label>
      <TextInput {...props} />
    </div>
  );
}
