/*
 * Copyright (c) 2017, Globo.com <https://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import chai from "chai";
import BaseFormConfig from "../src/form/baseForm";

const expect = chai.expect;
const SERIE_POINT_REGEX = BaseFormConfig.seriePointRegex;

describe("Serie Point Regex", function() {
  describe("should match", function () {
    it("one digit integer", function() {
      let number = "2";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("two digit integer", function() {
      let number = "45";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("three digit integer", function() {
      let number = "173";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("zero integer", function() {
      let number = "0";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("integer following by comma", function() {
      let number = "27.";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("float with one digit decimal", function() {
      let number = "63.1";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("float with two digit decimal", function() {
      let number = "97.94";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("float with three digit decimal", function() {
      let number = "125.751";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("float to 0", function() {
      let number = "0.73";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("negative digit", function() {
      let number = "-";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("negative integer", function() {
      let number = "-51";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("negative following by comma", function() {
      let number = "-51.";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });

    it("negative float", function() {
      let number = "-37.19";
      expect(number.match(SERIE_POINT_REGEX)).to.be.truthy;
    });
  });

  describe("should not match", function () {
    it("two comma", function() {
      let number = "21.15.931";
      expect(number.match(SERIE_POINT_REGEX)).not.to.be.truthy;
    });

    it("starting with comma", function() {
      let number = ".75";
      expect(number.match(SERIE_POINT_REGEX)).not.to.be.truthy;
    });

    it("negative digit following by comma", function() {
      let number = "-.";
      expect(number.match(SERIE_POINT_REGEX)).not.to.be.truthy;
    });
  });
});
