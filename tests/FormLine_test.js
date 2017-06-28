/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import FormLine from "../src/forms/Line";
import {
  Themes,
  LineOptionsOneSerieTwoCategories,
  LineOptionsTwoSeriesTwoCategories,
  LineOptionsOneSerieOneCategory
} from "./fixtures";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FormLine", function() {

  beforeEach(function() {
    this.data = {};
    this.setStateModal = (data) => {
      this.data = data;
    };
    this.oneSerieTwoCategories = mount(
      <FormLine
        model={{options: LineOptionsOneSerieTwoCategories, themes: Themes["default"]}}
        chartType="line"
        setStateModal={this.setStateModal} />
    );
    this.twoSeriesTwoCategories = mount(
      <FormLine
        model={{options: LineOptionsTwoSeriesTwoCategories, themes: Themes["default"]}}
        chartType="line"
        setStateModal={this.setStateModal} />
    );
    this.oneSerieOneCategory = mount(
      <FormLine
        model={{options: LineOptionsOneSerieOneCategory, themes: Themes["default"]}}
        chartType="line"
        setStateModal={this.setStateModal} />
    );
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
    this.oneSerieTwoCategories.find("input[name='title']").first().simulate("change", event);
    expect(this.data.options.title).to.equal("Veja histórico da taxa de analfabetismo no brasil");
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
    this.oneSerieTwoCategories.find("input[name='subtitle']").first().simulate("change", event);
    expect(this.data.options.subtitle).to.equal("Índice não apresentava um aumento desde 1997");
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
    this.oneSerieTwoCategories.find("input[name='credits']").first().simulate("change", event);
    expect(this.data.options.credits).to.equal("IBGE");
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
    this.oneSerieTwoCategories.find("input[name='yAxisTitle']").first().simulate("change", event);
    expect(this.data.options.yAxisTitle).to.equal("Anos");
  });

  it("change labels", function() {
    const event = {
      target: {
        checked: true
      }
    };
    this.oneSerieTwoCategories.ref("labels").simulate("change", event);
    expect(this.data.options.labels).to.equal(true);
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
    this.oneSerieTwoCategories.find("input[name='category-0']").first().simulate("change", event);
    expect(this.data.options.categories[0]).to.equal("Categoria");
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
    this.oneSerieTwoCategories.find("input[name='serieName-0']").first().simulate("change", event);
    expect(this.data.options.data[0].name).to.equal("Nome da série");
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
    this.oneSerieTwoCategories.find("input[name='color-0']").first().simulate("change", event);
    expect(this.data.themes.colors[0]).to.equal("#cccccc");
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
    this.oneSerieTwoCategories.find("input[name='seriePoint-0-0']").first().simulate("change", event);
    expect(this.data.options.data[0].value[0]).to.equal("20");
  });

  it("change serie point to negative value", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "seriePoint-0-0"
          }
        },
        value: "-20"
      }
    };
    this.oneSerieTwoCategories.find("input[name='seriePoint-0-0']").first().simulate("change", event);
    expect(this.data.options.data[0].value[0]).to.equal("-20");
  });

  it("click handlePointLineAdd one serie", function() {
    this.oneSerieTwoCategories.find("button[name='handlePointAdd']").first().simulate("click");
    expect(this.data.options.data.length).to.equal(2);
  });

  it("button Remove is not rendered if there is only one serie", function() {
    const expectedLength = this.oneSerieTwoCategories.find("button[name='handlePointRemove-0']").length;
    expect(expectedLength).to.equal(0);
  });

  it("click handlePointLineRemove greater than or equal to two series does remove", function() {
    this.twoSeriesTwoCategories.find("button[name='handlePointRemove-1']").first().simulate("click");
    expect(this.data.options.data.length).to.equal(1);
  });

  it("click addPoint one point in categories and series", function() {
    this.oneSerieTwoCategories.find("button[name='addPoint']").first().simulate("click");
    expect(this.data.options.categories.length).to.equal(3);
    expect(this.data.options.data[0].value.length).to.equal(3);
  });

  it("click removePoint greater than or equal to two point in categories and series does remove", function() {
    this.oneSerieTwoCategories.find("button[name='removePoint']").first().simulate("click");
    expect(this.data.options.categories.length).to.equal(1);
    expect(this.data.options.data[0].value.length).to.equal(1);
  });

  it("button Remove is not rendered if there is only one point in categories and series", function() {
    const expectedLength = this.oneSerieOneCategory.find("button[name='removePoint']").length;
    expect(expectedLength).to.equal(0);
  });
});
