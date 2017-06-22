"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartMethodsByType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * Copyright (c) 2017, Globo.com <httpss://github.com/globocom/megadraft-table-plugin>
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * License: MIT
                                                                                                                                                                                                                                                                   */

exports.CreateSimpleColumn = CreateSimpleColumn;
exports.CreatePieChart = CreatePieChart;
exports.CreateBasicLine = CreateBasicLine;
exports.CreateChartByType = CreateChartByType;

var _highcharts = require("highcharts/highcharts");

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultFontFamily = "\"opensans\", \"Open Sans\", \"helvetica\", \"verdana\"";
var DefaultGategoryStyle = {
  fontWeight: "bold",
  fontSize: "12px",
  color: "#333"
};

var formatPercentage = function formatPercentage(value) {
  return parseFloat(value).toFixed(2);
};

var setHighchartsOptions = function () {
  var executed = false;
  var setOptions = function setOptions() {
    if (!executed) {
      _highcharts2.default.setOptions({
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
}();

function buildDefaultChartConfig(options, chartType) {
  var chartConfig = {
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
  var defaultConfig = buildDefaultChartConfig(options, "line");
  return _extends({}, defaultConfig, {
    xAxis: {
      categories: options.categories,
      labels: {
        style: DefaultGategoryStyle
      }
    },
    tooltip: {
      followTouchMove: false,
      useHTML: true,
      formatter: function formatter() {
        var fragment = document.createElement("div"),
            name = document.createTextNode(" " + this.series.name + ": "),
            dot = document.createElement("span"),
            dotText = document.createTextNode("\u25CF"),
            b = document.createElement("span"),
            value = document.createTextNode(_highcharts2.default.numberFormat(this.y, -1));
        b.style.fontWeight = "bold";

        if (this.key) {
          var header = document.createElement("span");
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
      enabled: options.data.some(function (item) {
        return item.name !== " ";
      })
    },
    series: options.data
  });
}

function simpleColumn(options) {
  var defaultConfig = buildDefaultChartConfig(options, "column");
  return _extends({}, defaultConfig, {
    chart: Object.assign({}, defaultConfig.chart, { inverted: options.inverted }),
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
      formatter: function formatter() {
        var fragment = document.createElement("div"),
            name = document.createTextNode(options.name + " "),
            header = document.createElement("span");
        header.style.fontSize = "10px";
        header.style.fontWeight = "bold";
        header.appendChild(document.createTextNode(this.key));

        var b = document.createElement("b");
        var value = document.createTextNode(_highcharts2.default.numberFormat(this.y, -1));
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
  });
}

function pieChart(options) {
  var defaultConfig = buildDefaultChartConfig(options, "pie");
  return _extends({}, defaultConfig, {
    yAxisTitle: {},
    legend: {
      enabled: true,
      style: DefaultGategoryStyle,
      labelFormatter: function labelFormatter() {
        var value = options.percentage ? formatPercentage(this.percentage) : this.y,
            name = this.name ? this.name + ": " : "";
        return name + _highcharts2.default.numberFormat(value, -1) + (options.percentage ? " %" : "");
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function formatter() {
        var fragment = document.createElement("div"),
            name = document.createTextNode(options.name + " "),
            header = document.createElement("span");
        header.style.fontSize = "10px";
        header.style.fontWeight = "bold";
        header.appendChild(document.createTextNode(this.key));

        var b = document.createElement("b");
        var value = document.createTextNode(_highcharts2.default.numberFormat(options.percentage ? formatPercentage(this.percentage) : this.y, -1) + (options.percentage ? " %" : ""));
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
  });
}

function convertToFloat(value) {
  if (value === null) {
    return value;
  }

  var floatValue = parseFloat(value.replace(",", "."));
  return !isNaN(floatValue) ? floatValue : null;
}

function createChart(chartConfigFactory, container, colors, options) {
  var newOptions = JSON.parse(JSON.stringify(options));

  _highcharts2.default.theme = {
    colors: colors
  };
  _highcharts2.default.setOptions(_highcharts2.default.theme);

  newOptions.data = newOptions.data.map(function (obj) {
    return [obj.name, convertToFloat(obj.value[0])];
  });

  setHighchartsOptions();
  return _highcharts2.default.chart(container, chartConfigFactory(newOptions));
}

function CreateSimpleColumn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return createChart.apply(undefined, [simpleColumn].concat(args));
}

function CreatePieChart() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return createChart.apply(undefined, [pieChart].concat(args));
}

function CreateBasicLine(container, colors, options) {
  var newOptions = JSON.parse(JSON.stringify(options));

  for (var i = 0; i < newOptions.data.length; i++) {
    var newData = {
      color: colors[i],
      name: newOptions.data[i].name || " ",
      data: newOptions.data[i].value.map(convertToFloat)
    };
    newOptions.data[i] = newData;
  }

  setHighchartsOptions();
  return _highcharts2.default.chart(container, basicLine(newOptions));
}

var ChartMethodsByType = exports.ChartMethodsByType = {
  line: CreateBasicLine,
  column: CreateSimpleColumn,
  pie: CreatePieChart
};

function CreateChartByType(type) {
  var chartMethod = ChartMethodsByType[type];
  if (typeof chartMethod === "function") {
    for (var _len3 = arguments.length, opts = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      opts[_key3 - 1] = arguments[_key3];
    }

    return chartMethod.apply(undefined, opts);
  } else {
    console.error("[HighchartsConnector] Create -" + type + "- Chart method not found.");
  }
}