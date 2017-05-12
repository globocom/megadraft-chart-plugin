/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import FormLine from "../src/FormLine";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FormLine", function() {
  const themes = {
    "default": {
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

  const oneSerieTwoCategories = {
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

  const twoSeriesTwoCategories = {
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

  const oneSerieOneCategory = {
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

  beforeEach(function() {
    this.data = {};
    this.setStateModal = (data) => {this.data = data;};
    this.oneSerieTwoCategories = mount(<FormLine themes={themes["default"]} model={oneSerieTwoCategories} setStateModal={this.setStateModal} />);
    this.twoSeriesTwoCategories = mount(<FormLine themes={themes["default"]} model={twoSeriesTwoCategories} setStateModal={this.setStateModal} />);
    this.oneSerieOneCategory = mount(<FormLine themes={themes["default"]} model={oneSerieOneCategory} setStateModal={this.setStateModal} />);
  });

  it("exist", function() {
    expect(this.oneSerieTwoCategories).to.exist;
  });

  it("change title", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "title"
          }
        },
        value: "Veja histórico da taxa de analfabetismo no brasil"
      }
    };
    this.oneSerieTwoCategories.ref("title").simulate("change", event);
    expect(this.data.line.title).to.equal("Veja histórico da taxa de analfabetismo no brasil");
  });

  it("change subtitle", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "subtitle"
          }
        },
        value: "Índice não apresentava um aumento desde 1997"
      }
    };
    this.oneSerieTwoCategories.ref("subtitle").simulate("change", event);
    expect(this.data.line.subtitle).to.equal("Índice não apresentava um aumento desde 1997");
  });

  it("change credits", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "credits"
          }
        },
        value: "IBGE"
      }
    };
    this.oneSerieTwoCategories.ref("credits").simulate("change", event);
    expect(this.data.line.credits).to.equal("IBGE");
  });

  it("change yAxisTitle", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "yAxisTitle"
          }
        },
        value: "Anos"
      }
    };
    this.oneSerieTwoCategories.ref("yAxisTitle").simulate("change", event);
    expect(this.data.line.yAxisTitle).to.equal("Anos");
  });

  it("change labels", function() {
    const event = {
      target: {
        checked: true
      }
    };
    this.oneSerieTwoCategories.ref("labels").simulate("change", event);
    expect(this.data.line.labels).to.equal(true);
  });

  it("change categories", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "category-0"
          }
        },
        value: "Categoria"
      }
    };
    this.oneSerieTwoCategories.ref("category-0").simulate("change", event);
    expect(this.data.line.categories[0]).to.equal("Categoria");
  });

  it("change serie name", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "serieName-0"
          }
        },
        value: "Nome da série"
      }
    };
    this.oneSerieTwoCategories.ref("serieName-0").simulate("change", event);
    expect(this.data.line.series[0].name).to.equal("Nome da série");
  });

  it("change color", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "color-0"
          }
        },
        value: "#cccccc"
      }
    };
    this.oneSerieTwoCategories.ref("color-0").simulate("change", event);
    expect(this.data.lineThemes.colors[0]).to.equal("#cccccc");
  });

  it("change serie point", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "seriePoint-0-0"
          }
        },
        value: "20"
      }
    };
    this.oneSerieTwoCategories.ref("seriePoint-0-0").simulate("change", event);
    expect(this.data.line.series[0].data[0]).to.equal(20);
  });

  it("click handlePointLineAdd one serie", function() {
    this.oneSerieTwoCategories.ref("handlePointLineAdd").simulate("click");
    expect(this.data.line.series.length).to.equal(2);
  });

  it("click handlePointLineRemove equal to one serie does not remove", function() {
    this.oneSerieTwoCategories.ref("handlePointLineRemove-0").simulate("click");
    expect(this.data).to.eql({});
  });

  it("click handlePointLineRemove greater than or equal to two series does remove", function() {
    this.twoSeriesTwoCategories.ref("handlePointLineRemove-1").simulate("click");
    expect(this.data.line.series.length).to.equal(1);
  });

  it("click addPoint one point in categories and series", function() {
    this.oneSerieTwoCategories.ref("addPoint").simulate("click");
    expect(this.data.line.categories.length).to.equal(3);
    expect(this.data.line.series[0].data.length).to.equal(3);
  });

  it("click removePoint greater than or equal to two point in categories and series does remove", function() {
    this.oneSerieTwoCategories.ref("removePoint").simulate("click");
    expect(this.data.line.categories.length).to.equal(1);
    expect(this.data.line.series[0].data.length).to.equal(1);
  });

  it("click removePoint equal to one point in categories and series does not remove", function() {
    this.oneSerieOneCategory.ref("removePoint").simulate("click");
    expect(this.data).to.eql({});
  });
});
