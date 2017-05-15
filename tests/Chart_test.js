/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import {mount} from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import Chart from "../src/Chart";
import * as  HighchartsConnector from "../src/HighchartsConnector";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Chart", function() {
  const connector = "highcharts";
  const chartType = "line";
  const themes = {
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
  };

  const model = {
    categories: ["", "", ""],
    credits: "",
    labels: false,
    numberOfMarkers: 3,
    series: [{
      name: "",
      data: [null, null, null]
    }],
    subtitle: "",
    title: "",
    yAxisTitle: ""
  };

  beforeEach(function() {
    sinon.stub(HighchartsConnector, "CreateBasicLine", function() {
      return;
    });
    this.chart = mount(<Chart themes={themes} model={model} chartType={chartType} connector={connector}/>);
  });

  afterEach(function() {
    HighchartsConnector.CreateBasicLine.restore();
  });

  it("exist", function() {
    expect(this.chart).to.exist;
  });

  it("have a specific id", function() {
    expect(this.chart.find("#preview")).to.have.length(1);
  });
});
