/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";
import {unmountComponentAtNode} from "react-dom";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import {editorStateFromRaw} from "megadraft";

import Button from "../src/Button";
import ModalChart from "../src/ModalChart";
import { PluginIcon } from "../src/icon";
import { ChartMethodsByType } from "../src/HighchartsConnector";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Button", function() {

  beforeEach(function() {
    window.sessionStorage = {tenantSelectedId: "g1"};
    sinon.stub(ChartMethodsByType, "line", function () {
      return {
        getSVG: function() {
          return <svg />;
        }
      };
    });
    this.onChange = sinon.spy();
    this.button = mount(
      <Button
        onChange={this.onChange}
        editorState={editorStateFromRaw(null)} />
    );
    this.popin = this.button.find(ModalChart);
  });

  afterEach(function() {
    ChartMethodsByType.line.restore();
    unmountComponentAtNode(document);
    document.body.innerHTML = "";
  });

  it("exist", function() {
    expect(this.button).to.exist;
  });

  it("has an icon", function() {
    expect(this.button.containsAllMatchingElements([
      <PluginIcon/>
    ])).to.equal(true);
  });

  it("editable popin should be closed", function() {
    expect(this.popin.prop("isOpen")).to.be.false;
  });

  describe("on click", function() {
    beforeEach(function() {
      this.button.find("button").simulate("click");
    });

    it("popin should be opened", function() {
      expect(this.popin.prop("isOpen")).to.be.true;
    });
  });

  describe("when editable popin is opened", function() {
    beforeEach(function() {
      this.button.setState({isEditing: true});
    });

    it("should not call updateData when you close popin without saving", function() {
      this.popin.prop("onCloseRequest")();
      expect(this.button.state("isModalOpen")).to.be.false;
    });

    describe("on save", function() {
      beforeEach(function() {
        this.popin.prop("onSaveRequest")(this.popin.prop("chart"));
      });

      it("should call updateData", function() {
        expect(this.onChange.calledOnce).to.be.true;
      });

      it("should close popin", function() {
        expect(this.popin.prop("isOpen")).to.be.false;
      });
    });
  });
});
