/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import {shallow} from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

import FormPie from "../src/FormPie";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("FormPie", function() {
  const model = {};

  beforeEach(function() {
    this.formPie = shallow(<FormPie model={model}/>);
  });

  it("exist", function() {
    expect(this.formPie).to.exist;
  });
});
