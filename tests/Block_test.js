/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import {unmountComponentAtNode} from "react-dom";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

import { MegadraftPlugin } from "megadraft";
import Block from "../src/Block";
import ModalChart from "../src/ModalChart";
import { ChartMethodsByType } from "../src/HighchartsConnector";
import { LineCompleteData } from "./fixtures";


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

  beforeEach(function() {
    window.sessionStorage = {tenantSelectedId: "g1"};
    sinon.stub(ChartMethodsByType, "line", function () {
      return {
        getSVG: function() {
          return <svg />;
        }
      };
    });
    this.block = mount(
      <Block
        container={container}
        blockProps={container}
        data={LineCompleteData} />
    );
    this.popin = this.block.find(ModalChart);
  });

  afterEach(function () {
    ChartMethodsByType.line.restore();
    container.updateData.reset();
    unmountComponentAtNode(document);
    document.body.innerHTML = "";
  });

  it("exist", function() {
    expect(this.block).to.exist;
  });

  it("editable popin should be close", function() {
    expect(this.popin.prop("isOpen")).to.be.false;
  });

  it("check if _getChartID returns the correct key", function() {
    expect(this.block.find("#chart-key")).to.exist;
  });

  describe("on click edit button", function() {
    beforeEach(function() {
      const editButton = this.block.find(MegadraftPlugin.BlockAction).first();
      editButton.simulate("click");
    });

    it("editable popin should open when EditButton was clicked", function() {
      expect(this.block.find(ModalChart).prop("isOpen")).to.be.true;
    });
  });

  describe("on save", function() {
    beforeEach(function() {
      this.onSaveRequestSpy = sinon.spy(this.block.find(ModalChart).node, "onSaveRequest");
      sinon.stub(this.block.find(ModalChart).node, "_encodeOptimizedSVGDataUri", function () {
        return "uriPayload";
      });
      const editButton = this.block.find(MegadraftPlugin.BlockAction).first();
      editButton.simulate("click");
      expect(this.block.find(ModalChart).prop("isOpen")).to.be.true;
      const addButton = document.querySelector(".chart-add-button");
      TestUtils.Simulate.click(addButton);
    });

    afterEach(function () {
      unmountComponentAtNode(document);
      document.body.innerHTML = "";
    });

    it("should call _onSaveRequest", function() {
      expect(this.onSaveRequestSpy.callCount).to.equal(1);
    });
  });
});
