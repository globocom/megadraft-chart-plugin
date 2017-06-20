/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import { TextInputGroup } from "./inputs";

export const COMMON_FIELDS = [
  {
    name: "title",
    label: "Título",
    placeholder: "Ex.: Veja histórico da taxa de analfabetismo no brasil"
  },
  {
    name: "subtitle",
    label: "Subtítulo",
    placeholder: "Ex.: Índice não apresentava um aumento desde 1997"
  },
  {
    name: "credits",
    label: "Fonte",
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
