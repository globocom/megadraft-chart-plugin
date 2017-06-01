/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-table-plugin>
 *
 * License: MIT
 */

import Highcharts from "highcharts/highcharts";

const DefaultFontFamily = "\"opensans\", \"Open Sans\"";
const DEFAULT_CATEGORY_STYLE = {
  fontWeight: "bold",
  fontSize: "12px"
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
      text: options.title,
      style: {
        fontWeight: "bold",
        fontSize: "20px"
      }
    },
    subtitle: {
      text: options.subtitle,
      style: {
        color: "#1F1F1F",
        fontSize: "0.75rem"
      }
    },
    credits: {
      enabled: true,
      href: "",
      text: (options.credits) ? "Fonte: " + options.credits : "",
      style: {
        color: "#666",
        cursor: "default",
        fontSize: "0.75rem"
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
        style: DEFAULT_CATEGORY_STYLE
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
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
            const value = (options.percentage) ? this.percentage : this.y,
              name = (this.key) ? this.key + ": " : "";
            return name + Highcharts.numberFormat(value, -1) + ((options.percentage) ? " %": "");
          },
          style: DEFAULT_CATEGORY_STYLE
        }
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
    tooltip: {
      followTouchMove: false,
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(" " + this.series.name + ": "),
          dot = document.createElement("span"),
          dotText = document.createTextNode("\u25CF"),
          b = document.createElement("b"),
          value = document.createTextNode(Highcharts.numberFormat(this.y, -1));

        if (this.key) {
          let header = document.createElement("span");
          header.style.fontSize = "10px";
          header.appendChild(document.createTextNode(this.key));
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
        return fragment.innerHTML;
      }
    },
    legend: {
      enabled: options.data.some(item => item.name !== " ")
    },
    series: options.data
  };

  if (!options.data.some(item => (item.name && item.name !== " "))) {
    config.chart.marginBottom = 40;
  }
  return config;
}

function simpleColumn(options) {
  const defaultConfig = buildDefaultChartConfig(options, "column");

  if (!options.data.some(item => item[0])) {
    defaultConfig.chart.marginBottom = 40;
  }

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
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(options.name + " "),
          header = document.createElement("span");
        header.style.fontSize = "10px";
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
        return fragment.innerHTML;
      },
      followTouchMove: false
    },
    series: [{
      name: options.name,
      colorByPoint: true,
      data: options.data,
      dataLabels: {
        enabled: true,
        rotation: -1,
        color: "#0f0f0f0",
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
      formatter: function () {
        const fragment = document.createElement("div"),
          name = document.createTextNode(options.name + " "),
          header = document.createElement("span");
        header.style.fontSize = "10px";
        header.appendChild(document.createTextNode(this.key));

        const b = document.createElement("b");
        const value = document.createTextNode(
          Highcharts.numberFormat((options.percentage) ? this.percentage : this.y, -1) +
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
        return fragment.innerHTML;
      },
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

  setHighchartsOptions();
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

  setHighchartsOptions();
  return Highcharts.chart(container, pieChart(newOptions));
}
