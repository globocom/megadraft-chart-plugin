/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import Highcharts from "highcharts/highcharts";

const DEFAULT_CATEGORY_STYLE = {
  fontFamily: "\"opensans\", \"Open Sans\"",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#333333"
};

function buildDefaultChartConfig(options, chartType) {
  const chartConfig = {
    title: {
      text: options.title,
      style: {
        fontFamily: "\"opensans\", \"Open Sans\"",
        fontWeight: "bold",
        fontSize: "20px",
        color: "#333333"
      }
    },
    subtitle: {
      text: options.subtitle,
      style: {
        fontFamily: "\"opensans\", \"Open Sans\"",
        fontSize: "0.75rem",
        color: "#1F1F1F"
      }
    },
    credits: {
      enabled: true,
      href: "",
      text: (options.credits) ? "Fonte: " + options.credits : "",
      style: {
        cursor: "default",
        fontFamily: "\"opensans\", \"Open Sans\"",
        fontSize: "0.75rem",
        color: "#666"
      },
      position: {
        align: "left",
        x: 8
      }
    },
    chart: {
      type: chartType,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: "transparent",
      marginBottom: 40
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: options.yAxisTitle,
        style: DEFAULT_CATEGORY_STYLE
      }
    }
  };
  return chartConfig;
}

function basicLine(options) {
  const defaultConfig = buildDefaultChartConfig(options, "line");
  let config = {
    ...defaultConfig,
    xAxis: {
      categories: options.categories,
      labels: {
        style: DEFAULT_CATEGORY_STYLE
      }
    },
    legend: {
      enabled: options.data.some(item => item.name !== " ")
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
    series: options.data
  };

  if (config.legend.enabled) {
    delete config.chart.marginBottom;
  }
  return config;
}

function simpleColumn(options) {
  const defaultConfig = buildDefaultChartConfig(options, "column");
  return {
    ...defaultConfig,
    chart: Object.assign({}, defaultConfig.chart, {inverted: options.inverted}),
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: DEFAULT_CATEGORY_STYLE
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormatter: function() {
        return options.name + " <" + "b>" + (Math.round(this.y * 100) / 100) + "<" + "/b>";
      },
      followTouchMove: false
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
        style: DEFAULT_CATEGORY_STYLE
      }
    }]
  };
}

function pieChart(options) {
  const defaultConfig = buildDefaultChartConfig(options, "pie");
  return {
    ...defaultConfig,
    yAxisTitle: {},
    tooltip: {
      pointFormatter: function() {
        if (options.percentage) {
          return options.name + " <" + "b>" + (Math.round(this.percentage * 100) / 100) + " %<" + "/b>";
        }
        return options.name + " <" + "b>" + (Math.round(this.y * 100) / 100) + "<" + "/b>";
      },
      followTouchMove: false
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
            fontFamily: "\"opensans\", \"Open Sans\"",
            fontWeight: "bold",
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

function convertToFloat(value) {
  if (value === null) {
    return value;
  }

  let floatValue = parseFloat(value.replace(",", "."));
  return (!isNaN(floatValue)) ? floatValue : null;
}

export function CreateBasicLine(container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  for (let i=0;i < newOptions.data.length; i++) {
    let newData = {
      color: colors[i],
      name: newOptions.data[i].name || " ",
      data: newOptions.data[i].value.map(convertToFloat)
    };
    newOptions.data[i] = newData;
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

  newOptions.data = newOptions.data.map(function (obj) {
    return [obj.name, convertToFloat(obj.value[0])];
  });

  return Highcharts.chart(container, simpleColumn(newOptions));
}

export function CreatePieChart(container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  Highcharts.theme = {
    colors: colors
  };
  Highcharts.setOptions(Highcharts.theme);

  newOptions.data = newOptions.data.map(function (obj) {
    return {name: obj.name, y: convertToFloat(obj.value[0])};
  });

  return Highcharts.chart(container, pieChart(newOptions));
}
