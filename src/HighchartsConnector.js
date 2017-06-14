/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import Highcharts from "highcharts/highcharts";

const DefaultFontFamily = "\"opensans\", \"Open Sans\", \"helvetica\", \"verdana\"";
const DefaultGategoryStyle = {
  fontWeight: "bold",
  fontSize: "12px",
  color: "#333"
};

const formatPercentage = (value) => {
  return parseFloat(value).toFixed(2);
};

var setHighchartsOptions = (function() {
  let executed = false;
  const setOptions = function () {
    if (!executed) {
      Highcharts.setOptions({
        lang: {
          decimalPoint: ",",
          thousandsSep: "."
        },
        chart: {
          style: {
            fontFamily: DefaultFontFamily,
            color: "#333333"
          }
        }
      });
      executed = true;
    }
  };
  return setOptions;
})();

function buildDefaultChartConfig(options, chartType) {
  const chartConfig = {
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    credits: {
      enabled: false
    },
    chart: {
      type: chartType,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: "transparent"
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: options.yAxisTitle,
        style: DefaultGategoryStyle,
        margin: 0,
        x: -13
      }
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: options.labels
        },
        enableMouseTracking: true
      },
      column: {
        animation: false
      },
      pie: {
        animation: false,
        allowPointSelect: true,
        showInLegend: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false
        }
      }
    }
  };
  return chartConfig;
}

function basicLine(options) {
  const defaultConfig = buildDefaultChartConfig(options, "line");
  return {
    ...defaultConfig,
    xAxis: {
      categories: options.categories,
      labels: {
        style: DefaultGategoryStyle
      }
    },
    tooltip: {
      followTouchMove: false,
      useHTML: true,
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(" " + this.series.name + ": "),
          dot = document.createElement("span"),
          dotText = document.createTextNode("\u25CF"),
          b = document.createElement("span"),
          value = document.createTextNode(Highcharts.numberFormat(this.y, -1));
        b.style.fontWeight = "bold";

        if (this.key) {
          let header = document.createElement("span");
          header.appendChild(document.createTextNode(this.key));
          header.style.fontWeight = "bold";
          fragment.appendChild(header);
          fragment.appendChild(document.createElement("br"));
        }
        dot.style.color = this.color;
        dot.appendChild(dotText);
        fragment.appendChild(dot);

        fragment.appendChild(name);

        b.appendChild(value);
        fragment.appendChild(b);
        fragment.appendChild(document.createElement("br"));

        fragment.style.textAlign = "center";
        return fragment.outerHTML;
      },
      borderRadius: 5,
      style: {
        color: "rgb(255, 255, 255)",
        cursor: "default",
        fontSize: "12px",
        pointerEvents: "none",
        whiteSpace: "nowrap"
      },
      backgroundColor: "rgba(24, 24, 24, 0.8)",
      borderWidth: 0
    },
    legend: {
      enabled: options.data.some(item => item.name !== " ")
    },
    series: options.data
  };
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
        style: DefaultGategoryStyle
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(options.name + " "),
          header = document.createElement("span");
        header.style.fontSize = "10px";
        header.style.fontWeight = "bold";
        header.appendChild(document.createTextNode(this.key));

        const b = document.createElement("b");
        const value = document.createTextNode(Highcharts.numberFormat(this.y, -1));
        b.appendChild(value);

        if (typeof this.key !== "number") {
          fragment.appendChild(header);
          fragment.appendChild(document.createElement("br"));
        }
        fragment.appendChild(name);
        fragment.appendChild(b);
        fragment.appendChild(document.createElement("br"));

        fragment.style.textAlign = "center";
        return fragment.outerHTML;
      },
      borderRadius: 5,
      style: {
        color: "rgb(255, 255, 255)",
        cursor: "default",
        fontSize: "12px",
        pointerEvents: "none",
        whiteSpace: "nowrap"
      },
      backgroundColor: "rgba(24, 24, 24, 0.8)",
      borderWidth: 0,
      followTouchMove: false
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data,
      dataLabels: {
        enabled: true,
        padding: 5,
        crop: false,
        overflow: "none",
        color: "#0f0f0f0",
        style: DefaultGategoryStyle
      }
    }]
  };
}

function pieChart(options) {
  const defaultConfig = buildDefaultChartConfig(options, "pie");
  return {
    ...defaultConfig,
    yAxisTitle: {},
    legend: {
      enabled: true,
      style: DefaultGategoryStyle,
      labelFormatter: function () {
        const value = (options.percentage) ? formatPercentage(this.percentage) : this.y,
          name = (this.name) ? this.name + ": " : "";
        return name + Highcharts.numberFormat(value, -1) + ((options.percentage) ? " %": "");
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(options.name + " "),
          header = document.createElement("span");
        header.style.fontSize = "10px";
        header.style.fontWeight = "bold";
        header.appendChild(document.createTextNode(this.key));

        const b = document.createElement("b");
        const value = document.createTextNode(
          Highcharts.numberFormat((options.percentage) ? formatPercentage(this.percentage) : this.y, -1) +
          ((options.percentage) ? " %": "")
        );
        b.appendChild(value);

        if (this.key) {
          fragment.appendChild(header);
          fragment.appendChild(document.createElement("br"));
        }
        fragment.appendChild(name);
        fragment.appendChild(b);
        fragment.appendChild(document.createElement("br"));

        fragment.style.textAlign = "center";
        return fragment.outerHTML;
      },
      borderRadius: 5,
      style: {
        color: "rgb(255, 255, 255)",
        cursor: "default",
        fontSize: "12px",
        pointerEvents: "none",
        whiteSpace: "nowrap"
      },
      backgroundColor: "rgba(24, 24, 24, 0.8)",
      borderWidth: 0,
      followTouchMove: false
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

function createChart(chartConfigFactory, container, colors, options) {
  let newOptions = JSON.parse(JSON.stringify(options));

  Highcharts.theme = {
    colors: colors
  };
  Highcharts.setOptions(Highcharts.theme);

  newOptions.data = newOptions.data.map(function (obj) {
    return [obj.name, convertToFloat(obj.value[0])];
  });

  setHighchartsOptions();
  return Highcharts.chart(container, chartConfigFactory(newOptions));
}

export function CreateSimpleColumn(...args) {
  return createChart(simpleColumn, ...args);
}

export function CreatePieChart(...args) {
  return createChart(pieChart, ...args);
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

  setHighchartsOptions();
  return Highcharts.chart(container, basicLine(newOptions));
}

export const ChartMethodsByType = {
  line: CreateBasicLine,
  column: CreateSimpleColumn,
  pie: CreatePieChart
};

export function CreateChartByType(type, ...opts) {
  const chartMethod = ChartMethodsByType[type];
  if (typeof chartMethod === "function") {
    return chartMethod(...opts);
  } else {
    console.error(`[ShowChart] Create -${type}- Chart method not found.`);
  }
}
