/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React, {Component} from "react";

import { TextInputGroup } from "./inputs";


/*eslint no-unused-vars: "off" */
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

export default class CommonFieldsGroup extends Component {

  _renderFields() {
    return this.props.fields.map(field => {
      return (
        <TextInputGroup
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          onChange={this.props.onChange}
          defaultValue={this.props.model[field.name]}
        />
      );
    });
  }

  render() {
    return (
      <div>{ this._renderFields() }</div>
    );
  }
}
