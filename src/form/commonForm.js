/*
 * Copyright (c) 2016, Artur Sousa <arturfelipe.sousa@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import { TextInputGroup } from "./inputs";

const COMMON_FIELDS = [
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
  },
  {
    name: "yAxisTitle",
    label: "Legenda do eixo Y",
    placeholder: "Ex.: Anos"
  },
  {
    name: "name",
    label: "Legenda das séries",
    placeholder: "Ex.: Meses"
  }
];

export default class CommonForm extends Component {
  _shouldRenderField(fieldName) {
    const excludeFields = this.props.excludeFields;
    return (!excludeFields || excludeFields.indexOf(fieldName) == -1);
  }

  _renderFields() {
    return COMMON_FIELDS.map(field => {
      if (this._shouldRenderField(field.name)) {
        return (
          <TextInputGroup
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            onChange={this.props.onChange}
            value={this.props.model[field.name]}
          />
        );
      }
    });
  }

  render() {
    return (
      <div>{ this._renderFields() }</div>
    );
  }
}
