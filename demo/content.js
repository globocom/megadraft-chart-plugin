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
      text: "Megadraft chart - Megadraft Plugin",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    },
    {
      "key": "9mddm",
      "text": "",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "type": constants.PLUGIN_TYPE,
        "chart": {
          "type": "pie",
          "themes": {
            "colors": [
              "#f45b5b",
              "#8085e9",
              "#8d4654",
              "#7798BF",
              "#aaeeee",
              "#ff0066",
              "#eeaaee",
              "#55BF3B",
              "#DF5353",
              "#7798BF",
              "#aaeeee",
              "#324ca3"
            ]
          },
          "options": {
            "title": "Período de Trabalho",
            "subtitle": "em %, Funcionários do Setor Administrativo",
            "credits": "UNIARP",
            "data": [
              {
                "name": "Manhã",
                "value": [
                  "22"
                ]
              },
              {
                "name": "Tarde",
                "value": [
                  "71"
                ]
              },
              {
                "name": "Noite",
                "value": [
                  "7"
                ]
              }
            ],
            "name": "Turno",
            "percentage": false
          },
          "svg": "%3Csvg xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' class='highcharts-root' style='font-family:%26quot%3Bopensans%26quot%3B%2C %26quot%3Bopen sans%26quot%3B%2C %26quot%3Bhelvetica%26quot%3B%2C %26quot%3Bverdana%26quot%3B%3Bfont-size:12px%3Bcolor:%23333333%3Bfill:%23333333%3B' xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cdesc%3ECreated with Highcharts 5.0.9%3C/desc%3E%3Cdefs%3E%3CclipPath id='highcharts-9976bmn-148'%3E%3Crect x='0' y='0' width='580' height='375' fill='none'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Crect fill='transparent' class='highcharts-background' x='0' y='0' width='600' height='400' rx='0' ry='0'%3E%3C/rect%3E%3Crect fill='none' class='highcharts-plot-background' x='10' y='10' width='580' height='375'%3E%3C/rect%3E%3Crect fill='none' class='highcharts-plot-border' x='10' y='10' width='580' height='375'%3E%3C/rect%3E%3Cg class='highcharts-series-group'%3E%3Cg class='highcharts-series highcharts-series-0 highcharts-pie-series highcharts-color-undefined ' transform='translate(10%2C10) scale(1 1)'%3E%3Cpath fill='%23f45b5b' d='M 289.9681251436217 39.50000324602709 A 156.5 156.5 0 0 1 443.7131423661656 166.59728135156686 L 290 196 A 0 0 0 0 0 290 196 Z' transform='translate(0%2C0)' stroke='%23ffffff' stroke-width='1' stroke-linejoin='round' class='highcharts-point highcharts-color-0'%3E%3C/path%3E%3Cpath fill='%238085e9' d='M 443.74246822334874 166.75100916967227 A 156.5 156.5 0 1 1 223.285401614818 54.43230466556335 L 290 196 A 0 0 0 1 0 290 196 Z' transform='translate(0%2C0)' stroke='%23ffffff' stroke-width='1' stroke-linejoin='round' class='highcharts-point highcharts-color-1'%3E%3C/path%3E%3Cpath fill='%238d4654' d='M 223.4270026438543 54.36566086213901 A 156.5 156.5 0 0 1 289.7826246396918 39.50015096508005 L 290 196 A 0 0 0 0 0 290 196 Z' transform='translate(0%2C0)' stroke='%23ffffff' stroke-width='1' stroke-linejoin='round' class='highcharts-point highcharts-color-2'%3E%3C/path%3E%3C/g%3E%3Cg class='highcharts-markers highcharts-series-0 highcharts-pie-series highcharts-color-undefined ' transform='translate(10%2C10) scale(1 1)'%3E%3C/g%3E%3C/g%3E%3Cg class='highcharts-data-labels highcharts-series-0 highcharts-pie-series highcharts-color-undefined ' transform='translate(10%2C10) scale(1 1)' opacity='1'%3E%3Cpath fill='none' class='highcharts-data-label-connector highcharts-color-0' stroke='%23f45b5b' stroke-width='1' d='M 413.87957408813065 51.799280222315325 C 408.87957408813065 51.799280222315325 397.4059422726542 65.66851859227953 393.5813983341621 70.29159804893426 L 389.75685439566996 74.914677505589'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-data-label-connector highcharts-color-1' stroke='%238085e9' stroke-width='1' d='M 200.33077179857446 361.6727167611306 C 205.33077179857446 361.6727167611306 213.50260079388636 345.63459932573994 216.22654379232364 340.28856018060975 L 218.95048679076092 334.94252103547956'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-data-label-connector highcharts-color-2' stroke='%238d4654' stroke-width='1' d='M 244.31628547954466 13.491523898423655 C 249.31628547954466 13.491523898423655 253.24286382468247 31.058025613321107 254.55172327306173 36.91352618495359 L 255.86058272144098 42.76902675658607'%3E%3C/path%3E%3Cg class='highcharts-label highcharts-data-label highcharts-data-label-color-0 ' style='cursor:pointer%3B' transform='translate(419%2C42)'%3E%3Ctext x='5' style='font-size:12px%3Bfont-weight:bold%3Bcolor:%23333%3Btext-outline:1px contrast%3Bfill:%23333%3B' y='17'%3E%3Ctspan x='5' y='17' class='highcharts-text-outline' fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='2px' stroke-linejoin='round' style=''%3EManh%C3%A3: 22%3C/tspan%3E%3Ctspan x='5' y='17'%3EManh%C3%A3: 22%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg class='highcharts-label highcharts-data-label highcharts-data-label-color-1 ' style='cursor:pointer%3B' transform='translate(130%2C352)'%3E%3Ctext x='5' style='font-size:12px%3Bfont-weight:bold%3Bcolor:%23333%3Btext-outline:1px contrast%3Bfill:%23333%3B' y='17'%3E%3Ctspan x='5' y='17' class='highcharts-text-outline' fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='2px' stroke-linejoin='round' style=''%3ETarde: 71%3C/tspan%3E%3Ctspan x='5' y='17'%3ETarde: 71%3C/tspan%3E%3C/text%3E%3C/g%3E%3Cg class='highcharts-label highcharts-data-label highcharts-data-label-color-2 ' style='cursor:pointer%3B' transform='translate(181%2C3)'%3E%3Ctext x='5' style='font-size:12px%3Bfont-weight:bold%3Bcolor:%23333%3Btext-outline:1px contrast%3Bfill:%23333%3B' y='17'%3E%3Ctspan x='5' y='17' class='highcharts-text-outline' fill='%23FFFFFF' stroke='%23FFFFFF' stroke-width='2px' stroke-linejoin='round' style=''%3ENoite: 7%3C/tspan%3E%3Ctspan x='5' y='17'%3ENoite: 7%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/g%3E%3Cg class='highcharts-legend'%3E%3Crect fill='none' class='highcharts-legend-box' rx='0' ry='0' x='0' y='0' width='8' height='8' visibility='hidden'%3E%3C/rect%3E%3Cg%3E%3Cg%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
        }
      }
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
    },
    {
      "key": "er3bc",
      "text": "",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "type": constants.PLUGIN_TYPE,
        "chart": {
          "type": "line",
          "themes": {
            "colors": [
              "#f45b5b",
              "#8085e9",
              "#8d4654",
              "#7798BF",
              "#aaeeee",
              "#ff0066",
              "#eeaaee",
              "#55BF3B",
              "#DF5353",
              "#7798BF",
              "#aaeeee"
            ]
          },
          "options": {
            "numberOfMarkers": 10,
            "categories": [
              "jan",
              "fev",
              "mar",
              "abril",
              "mai",
              "jun",
              "jul",
              "ago",
              "set",
              "out"
            ],
            "data": [
              {
                "name": "Taxa de desemprego",
                "value": [
                  "9,5",
                  "10,2",
                  "10,9",
                  "11,2",
                  "11,2",
                  "11,3",
                  "11,6",
                  "11,8",
                  "11,8",
                  "11,8"
                ]
              }
            ],
            "title": "Taxa de desemprego",
            "subtitle": "Em %, na média dos últimos meses",
            "credits": "Pnad/IBGE",
            "yAxisTitle": ""
          },
          "svg": "%3Csvg xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' class='highcharts-root' style='font-family:%26quot%3Bopensans%26quot%3B%2C %26quot%3Bopen sans%26quot%3B%3Bfont-size:12px%3Bcolor:%23333333%3Bfill:%23333333%3B' xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Cdesc%3ECreated with Highcharts 5.0.9%3C/desc%3E%3Cdefs%3E%3CclipPath id='highcharts-z5xpdbq-39'%3E%3Crect x='0' y='0' width='541' height='310' fill='none'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Crect fill='transparent' class='highcharts-background' x='0' y='0' width='600' height='400' rx='0' ry='0'%3E%3C/rect%3E%3Crect fill='none' class='highcharts-plot-background' x='49' y='10' width='541' height='310'%3E%3C/rect%3E%3Cg class='highcharts-grid highcharts-xaxis-grid '%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 102.5 10 L 102.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 156.5 10 L 156.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 210.5 10 L 210.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 264.5 10 L 264.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 319.5 10 L 319.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 373.5 10 L 373.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 427.5 10 L 427.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 481.5 10 L 481.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 535.5 10 L 535.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 589.5 10 L 589.5 320' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-grid-line' d='M 48.5 10 L 48.5 320' opacity='1'%3E%3C/path%3E%3C/g%3E%3Cg class='highcharts-grid highcharts-yaxis-grid '%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 320.5 L 590 320.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 268.5 L 590 268.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 217.5 L 590 217.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 165.5 L 590 165.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 113.5 L 590 113.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 62.5 L 590 62.5' opacity='1'%3E%3C/path%3E%3Cpath fill='none' stroke='%23e6e6e6' stroke-width='1' class='highcharts-grid-line' d='M 49 9.5 L 590 9.5' opacity='1'%3E%3C/path%3E%3C/g%3E%3Crect fill='none' class='highcharts-plot-border' x='49' y='10' width='541' height='310'%3E%3C/rect%3E%3Cg class='highcharts-axis highcharts-xaxis '%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 102.5 320 L 102.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 156.5 320 L 156.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 210.5 320 L 210.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 264.5 320 L 264.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 319.5 320 L 319.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 373.5 320 L 373.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 427.5 320 L 427.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 481.5 320 L 481.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 535.5 320 L 535.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 590.5 320 L 590.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-tick' stroke='%23ccd6eb' stroke-width='1' d='M 48.5 320 L 48.5 330' opacity='1'%3E%3C/path%3E%3Cpath fill='none' class='highcharts-axis-line' stroke='%23ccd6eb' stroke-width='1' d='M 49 320.5 L 590 320.5'%3E%3C/path%3E%3C/g%3E%3Cg class='highcharts-axis highcharts-yaxis '%3E%3Cpath fill='none' class='highcharts-axis-line' d='M 49 10 L 49 320'%3E%3C/path%3E%3C/g%3E%3Cg class='highcharts-series-group'%3E%3Cg class='highcharts-series highcharts-series-0 highcharts-line-series highcharts-color-undefined ' transform='translate(49%2C10) scale(1 1)' clip-path='url(%23highcharts-z5xpdbq-39)'%3E%3Cpath fill='none' d='M 27.05 258.3333333333333 L 81.15 186.00000000000009 L 135.25 113.66666666666663 L 189.35 82.66666666666674 L 243.45 82.66666666666674 L 297.55 72.33333333333326 L 351.65 41.33333333333337 L 405.75 20.66666666666663 L 459.85 20.66666666666663 L 513.95 20.66666666666663' class='highcharts-graph' stroke='%23f45b5b' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'%3E%3C/path%3E%3C/g%3E%3Cg class='highcharts-markers highcharts-series-0 highcharts-line-series highcharts-color-undefined ' transform='translate(49%2C10) scale(1 1)' clip-path='none'%3E%3Cpath fill='%23f45b5b' d='M 31 258 A 4 4 0 1 1 30.99999800000017 257.99600000066664 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 85 186 A 4 4 0 1 1 84.99999800000016 185.99600000066667 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 139 114 A 4 4 0 1 1 138.99999800000018 113.99600000066667 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 193 83 A 4 4 0 1 1 192.99999800000018 82.99600000066667 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 247 83 A 4 4 0 1 1 246.99999800000018 82.99600000066667 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 301 72 A 4 4 0 1 1 300.9999980000002 71.99600000066667 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 355 41 A 4 4 0 1 1 354.9999980000002 40.99600000066666 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 409 21 A 4 4 0 1 1 408.9999980000002 20.996000000666665 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 463 21 A 4 4 0 1 1 462.9999980000002 20.996000000666665 Z' class='highcharts-point'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 517 21 A 4 4 0 1 1 516.9999980000001 20.996000000666665 Z' class='highcharts-point'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg class='highcharts-legend' transform='translate(220%2C357)'%3E%3Crect fill='none' class='highcharts-legend-box' rx='0' ry='0' x='0' y='0' width='160' height='28' visibility='visible'%3E%3C/rect%3E%3Cg%3E%3Cg%3E%3Cg class='highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0' transform='translate(8%2C3)'%3E%3Cpath fill='none' d='M 0 11 L 16 11' class='highcharts-graph' stroke='%23f45b5b' stroke-width='2'%3E%3C/path%3E%3Cpath fill='%23f45b5b' d='M 12 11 A 4 4 0 1 1 11.999998000000167 10.996000000666664 Z' class='highcharts-point'%3E%3C/path%3E%3Ctext x='21' style='color:%23333333%3Bfont-size:12px%3Bfont-weight:bold%3Bcursor:pointer%3Bfill:%23333333%3B' text-anchor='start' y='15'%3E%3Ctspan%3ETaxa de desemprego%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg class='highcharts-axis-labels highcharts-xaxis-labels '%3E%3Ctext x='76.05' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Ejan%3C/text%3E%3Ctext x='130.14999999999998' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Efev%3C/text%3E%3Ctext x='184.25' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Emar%3C/text%3E%3Ctext x='238.34999999999997' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Eabril%3C/text%3E%3Ctext x='292.45' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Emai%3C/text%3E%3Ctext x='346.55' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Ejun%3C/text%3E%3Ctext x='400.65000000000003' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Ejul%3C/text%3E%3Ctext x='454.75' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Eago%3C/text%3E%3Ctext x='508.8500000000001' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Eset%3C/text%3E%3Ctext x='562.95' style='color:%23333%3Bcursor:default%3Bfont-size:12px%3Bfont-weight:bold%3Bfill:%23333%3B' text-anchor='middle' transform='translate(0%2C0)' y='340' opacity='1'%3Eout%3C/text%3E%3C/g%3E%3Cg class='highcharts-axis-labels highcharts-yaxis-labels '%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='323' opacity='1'%3E%3Ctspan%3E9%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='271' opacity='1'%3E%3Ctspan%3E9%2C5%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='220' opacity='1'%3E%3Ctspan%3E10%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='168' opacity='1'%3E%3Ctspan%3E10%2C5%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='116' opacity='1'%3E%3Ctspan%3E11%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='65' opacity='1'%3E%3Ctspan%3E11%2C5%3C/tspan%3E%3C/text%3E%3Ctext x='34' style='color:%23666666%3Bcursor:default%3Bfont-size:11px%3Bfill:%23666666%3B' text-anchor='end' transform='translate(0%2C0)' y='13' opacity='1'%3E%3Ctspan%3E12%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E"
        }
      }
    }
  ]
};
