/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";
import {unmountComponentAtNode} from "react-dom";

import {mount} from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import Chart from "../src/Chart";
import Highcharts from "highcharts/highcharts";
import {
  Themes,
  LineOptionsOneSerieTwoCategories
} from "./fixtures";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Chart", function() {
  const connector = "highcharts";
  const chartType = "line";

  beforeEach(function() {
    this.highchartsStub = sinon.stub(Highcharts, "chart", function() {
      return <svg />;
    });
    this.chart = mount(
      <Chart
        themes={Themes["default"]}
        model={LineOptionsOneSerieTwoCategories}
        connector={connector}
        chartType={chartType} />
    );
  });

  afterEach(function() {
    this.highchartsStub.restore();
    unmountComponentAtNode(document);
    document.body.innerHTML = "";
  });

  it("exist", function() {
    expect(this.chart).to.exist;
  });

  it("have a specific id", function() {
    expect(this.chart.find("#chart-modal__preview")).to.have.length(1);
  });
});
