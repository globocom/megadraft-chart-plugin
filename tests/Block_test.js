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

import Block from "../src/Block";

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
    chart: {}
  };

  beforeEach(function() {
    window.sessionStorage = {tenantSelectedId: "g1"};
    this.block = mount(<Block container={container} blockProps={container} data={data} />);
  });

  it("exist", function() {
    expect(this.block).to.exist;
    expect(this.block.find("ModalChart")).to.exist;
  });
});
