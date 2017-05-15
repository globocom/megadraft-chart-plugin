/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

import Block from "../src/Block";
import * as HighchartsConnector from "../src/HighchartsConnector";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Block", function() {
  const container = {
    remove: sinon.spy(),
    plugin: sinon.spy(),
    updateData: sinon.spy(),
    props: {
      offsetKey: "key-0"
    }
  };

  const data = {
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

  beforeEach(function() {
    window.sessionStorage = {tenantSelectedId: "g1"};
    sinon.stub(HighchartsConnector, "CreateBasicLine", function () {
      return;
    });
    sinon.stub(HighchartsConnector, "CreateSimpleColumn", function () {
      return;
    });
    sinon.stub(HighchartsConnector, "CreatePieChart", function () {
      return;
    });
    this.block = mount(<Block container={container} blockProps={container} data={data} />);
  });

  afterEach(function () {
    HighchartsConnector.CreateBasicLine.restore();
    HighchartsConnector.CreateSimpleColumn.restore();
    HighchartsConnector.CreatePieChart.restore();
  });

  it("exist", function() {
    expect(this.block).to.exist;
    expect(this.block.find("ModalChart")).to.exist;
  });

  it("check if _getChartID returns the correct key", function() {
    expect(this.block.find("#chart-key")).to.exist;
  });
});
