/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import FormPie from "../src/FormPie";
import {
  Themes,
  PieOptionsOneSerie,
  PieOptionsTwoSeries
} from "./fixtures";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FormPie", function() {

  beforeEach(function() {
    this.data = {};
    this.setStateModal = (data) => {
      this.data = data;
    };
    this.oneSerie = mount(
      <FormPie
        model={{options: PieOptionsOneSerie, themes: Themes["default"]}}
        setStateModal={this.setStateModal}
        chartType="pie"
      />
    );
    this.twoSeries = mount(
      <FormPie
        model={{options: PieOptionsTwoSeries, themes: Themes["default"]}}
        setStateModal={this.setStateModal}
        chartType="pie"
      />
    );
  });

  it("exist", function() {
    expect(this.oneSerie).to.exist;
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
    this.oneSerie.find("input[name='title']").first().simulate("change", event);
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
    this.oneSerie.find("input[name='subtitle']").first().simulate("change", event);
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
    this.oneSerie.find("input[name='credits']").first().simulate("change", event);
    expect(this.data.options.credits).to.equal("IBGE");
  });

  it("change name", function() {
    const event = {
      target: {
        attributes: {
          name: {
            nodeValue: "name"
          }
        },
        value: "Meses"
      }
    };
    this.oneSerie.find("input[name='name']").first().simulate("change", event);
    expect(this.data.options.name).to.equal("Meses");
  });

  it("change percentage", function() {
    const event = {
      target: {
        checked: true
      }
    };
    this.oneSerie.find("input[name='percentage']").first().simulate("change", event);
    expect(this.data.options.percentage).to.equal(true);
  });

  it("change serie name", function() {
    const event = {
      target: {
        value: "Nome da série"
      }
    };
    this.oneSerie.find("input[name='serieName-0']").simulate("change", event);
    expect(this.data.options.data[0].name).to.equal("Nome da série");
  });

  it("change color", function() {
    const event = {
      target: {
        value: "#cccccc"
      }
    };
    this.oneSerie.find("input[name='color-0']").simulate("change", event);
    expect(this.data.themes.colors[0]).to.equal("#cccccc");
  });

  it("change serie point", function() {
    const event = {
      target: {
        value: "20"
      }
    };
    this.oneSerie.find("input[name='seriePoint-0-0']").simulate("change", event);
    expect(this.data.options.data[0].value[0]).to.equal("20");
  });

  it("click handlePointPieAdd one serie", function() {
    this.oneSerie.find("button[name='handlePointAdd']").first().simulate("click");
    expect(this.data.options.data.length).to.equal(2);
  });

  it("button Remove is not rendered if there is only one serie", function() {
    const expectedLength = this.oneSerie.find("button[name='handlePointRemove-0']").length;
    expect(expectedLength).to.equal(0);
  });

  it("click handlePointPieRemove greater than or equal to two series does remove", function() {
    this.twoSeries.find("button[name='handlePointRemove-1']").first().simulate("click");
    expect(this.data.options.data.length).to.equal(1);
  });
});
