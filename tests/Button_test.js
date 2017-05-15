/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import { shallow } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import {editorStateFromRaw} from "megadraft";

import Button from "../src/Button";
import { PluginIcon } from "../src/icon";


chai.use(chaiEnzyme());

const expect = chai.expect;

describe("Button", function() {

  beforeEach(function() {
    window.sessionStorage = {tenantSelectedId: "g1"};
    this.button = shallow(
      <Button
        editorState={editorStateFromRaw(null)} />
    );
  });

  it("exist", function() {
    expect(this.button).to.exist;
  });

  it("has an icon", function() {
    expect(this.button.containsAllMatchingElements([
      <PluginIcon/>
    ])).to.equal(true);
  });
});
