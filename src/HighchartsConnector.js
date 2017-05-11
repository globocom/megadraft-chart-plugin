/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import Highcharts from "highcharts/highcharts";


function basicLine(options) {
  return {
    chart: {
      type: "line"
    },
    credits: {
      enabled: true,
      href: "",
      text: options.credits,
      style: {
        cursor: "default"
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    title: {
      text: options.title,
      style: {
        fontFamily: "proximanova",
        fontSize: "20px",
        color: "#333333"
      }
    },
    subtitle: {
      text: options.subtitle,
      style: {
        fontFamily: "proximanova-light",
        fontSize: "12px",
        color: "#1F1F1F"
      }
    },
    yAxis: {
      title: {
        text: options.yAxisTitle,
        style: {
          fontFamily: "proximanova",
          fontSize: "12px",
          color: "#333333"
        }
      }
    },
    xAxis: {
      categories: options.categories,
      labels: {
        style: {
          fontFamily: "proximanova",
          fontSize: "12px",
          color: "#333333"
        }
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: options.labels,
          formatter: function() {
            return (Math.round(this.y * 100) / 100);
          }
        },
        enableMouseTracking: true
      }
    },
    series: options.series
  };
}

function simpleColumn(options) {
  return {
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: true,
      text: options.credits
    },
    chart: {
      type: "column",
      inverted: options.inverted
    },
    title: {
      text: options.title,
      style: {
        fontFamily: "proximanova",
        fontSize: "20px",
        color: "#333333"
      }
    },
    subtitle: {
      text: options.subtitle,
      style: {
        fontFamily: "proximanova-light",
        fontSize: "12px",
        color: "#1F1F1F"
      }
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontFamily: "proximanova",
          fontSize: "12px",
          color: "#333333"
        }
      }
    },
    yAxis: {
      title: {
        text: options.yAxisTitle,
        style: {
          fontFamily: "proximanova",
          fontSize: "12px",
          color: "#333333"
        }
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormatter: function() {
        return options.name + " <b>" + (Math.round(this.y * 100) / 100) + "</b>";
      }
    },
    plotOptions: {
      column: {
        animation: false
      }
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data,
      dataLabels: {
        enabled: true,
        rotation: -1,
        color: "#0f0f0f0",
        formatter: function() {
          return (Math.round(this.y * 100) / 100);
        },
        x: options.x,
        y: options.y, // pixels down from the top
        style: {
          fontFamily: "proximanova",
          fontSize: "12px",
          color: "#333333"
        }
      }
    }]
  };
}

function pieChart(options) {
  return {
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: true,
      text: options.credits
    },
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: options.title,
      style: {
        fontFamily: "proximanova",
        fontSize: "20px",
        color: "#333333"
      }
    },
    subtitle: {
      text: options.subtitle,
      style: {
        fontFamily: "proximanova-light",
        fontSize: "12px",
        color: "#1F1F1F"
      }
    },
    tooltip: {
      pointFormatter: function() {
        if (options.percentage) {
          return options.name + " <b>" + (Math.round(this.percentage * 100) / 100) + " %</b>";
        }
        return options.name + " <b>" + (Math.round(this.y * 100) / 100) + "</b>";
      }
    },
    plotOptions: {
      pie: {
        animation: false,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function() {
            if (options.percentage) {
              return this.point.name + ": " + (Math.round(this.percentage * 100) / 100) + " %";
            }
            return this.point.name + ": " + (Math.round(this.y * 100) / 100);
          },
          style: {
            fontFamily: "proximanova",
            fontSize: "12px",
            color: "#333333"
          }
        }
      }
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data
    }]
  };
}

export function CreateBasicLine(container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  for (let i=0;i < newOptions.series.length; i++) {
    newOptions.series[i]["color"] = colors[i];
    newOptions.series[i]["name"] = newOptions.series[i]["name"] || " ";
  }

  return Highcharts.chart(container, basicLine(newOptions));
}

export function CreateSimpleColumn(container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  Highcharts.theme = {
    colors: colors
  };
  Highcharts.setOptions(Highcharts.theme);

  newOptions.x = 0;
  newOptions.y = 5;

  if (newOptions.inverted) {
    newOptions.x = 10;
  } else {
    newOptions.y = -10;
  }

  return Highcharts.chart(container, simpleColumn(newOptions));
}

export function CreatePieChart(container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  Highcharts.theme = {
    colors: colors
  };
  Highcharts.setOptions(Highcharts.theme);

  return Highcharts.chart(container, pieChart(newOptions));
}
