export const Themes = {
  default: {
    colors: [
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
  }
};

export const LineCompleteData = {
  chart: {
    type: "line",
    themes: {
      colors: [
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
    options: {
      title: "",
      subtitle: "",
      credits: "",
      yAxisTitle: "",
      labels: false,
      numberOfMarkers: 3,
      categories: ["", "", ""],
      series: [{
        name: "",
        data: [null, null, null]
      }]
    }
  }
};

export const LineOptionsOneSerieTwoCategories = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 2,
  categories: ["", ""],
  series: [{
    name: "",
    data: [null, null]
  }]
};

export const LineOptionsTwoSeriesTwoCategories = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 2,
  categories: ["", ""],
  series: [{
    name: "",
    data: [null, null]
  },{
    name: "",
    data: [null, null]
  }]
};

export const LineOptionsOneSerieOneCategory = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  labels: false,
  numberOfMarkers: 1,
  categories: [""],
  series: [{
    name: "",
    data: [null]
  }]
};

export const ColumnOptionsOneSerie = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  name: "",
  inverted: false,
  data: [
    ["", null]
  ]
};

export const ColumnOptionsTwoSeries = {
  title: "",
  subtitle: "",
  credits: "",
  yAxisTitle: "",
  name: "",
  inverted: false,
  data: [
    ["", null],
    ["", null]
  ]
};

export const PieOptionsOneSerie = {
  title: "",
  subtitle: "",
  credits: "",
  name: "",
  percentage: false,
  data: [{
    name: "",
    y: null
  }]
};

export const PieOptionsTwoSeries = {
  title: "",
  subtitle: "",
  credits: "",
  name: "",
  percentage: false,
  data: [{
    name: "",
    y: null
  },{
    name: "",
    y: null
  }]
};
