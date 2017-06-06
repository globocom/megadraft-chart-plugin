/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import constants from "../src/constants";

export default {
  entityMap: {
  },
  blocks: [
    {
      key: "ag6qs",
      text: "Megadraft backstage chart - Megadraft Plugin",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    },
    {
      "key": "aifms",
      "text": "",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "type": constants.PLUGIN_TYPE,
        "chart": {
          "type": "column",
          "themes": {
            "colors": [
              "#f45b5b",
              "#5675e9",
              "#8728BF",
              "#cc0444",
              "#ff0023",
              "#ff0089",
              "#55BF3B",
              "#DF5353",
              "#7798BF",
              "#aaeeee",
              "#8d4654"
            ]
          },
          "options": {
            "title": "Emprego por setor",
            "subtitle": "Saldo de contratações e demissões por setor no acumulado no ano até outubro",
            "credits": "Caged/Ministério do Trabalho",
            "data": [
              {
                "name": "Indústria",
                "value": [
                  "-142,563"
                ]
              },
              {
                "name": "Construção Civil",
                "value": [
                  "-224,807"
                ]
              },
              {
                "name": "Comércio",
                "value": [
                  "-246,932"
                ]
              },
              {
                "name": "Serviços",
                "value": [
                  "-199,667"
                ]
              },
              {
                "name": "Adm. Pública",
                "value": [
                  "15,608"
                ]
              },
              {
                "name": "Agricultura",
                "value": [
                  "61,784"
                ]
              }
            ],
            "yAxisTitle": "",
            "name": "Setor",
            "inverted": false
          }
        }
      }
    }
  ]
};
