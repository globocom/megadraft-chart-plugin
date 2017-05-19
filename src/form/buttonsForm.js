/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

const commonClasseNames = ["bs-ui-button", "bs-ui-button--small"];

function FormButton({className, name, onClick, children}) {
  return (
    <button
      className={className}
      name={name}
      onClick={onClick}>
      {children}
    </button>
  );
}

export function FormCloseButton({className = "", ...props}) {
  const closeButtonClassNames = [
    ...commonClasseNames,
    ...className,
    "bs-ui-button--red",
    "chart-modal__form__btn-remove"
  ];

  return (
    <FormButton
      {...props}
      className={closeButtonClassNames.join(" ")}
    />
  );
}

export function FormPlusButton({className = "", ...props}) {
  const plusButtonClassNames = [
    ...commonClasseNames,
    "bs-ui-button--blue",
    "chart-modal__form__btn-add"
  ];

  return (
    <FormButton
      {...props}
      className={plusButtonClassNames.join(" ")}
    />
  );
}
