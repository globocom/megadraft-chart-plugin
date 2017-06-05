/*
 * Copyright (c) 2017, Globo.com <http://store.backstage.globoi.com/project/jornalismo/chart>
 *
 * License: MIT
 */

import React from "react";

import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import * as HighchartsConnector from "../src/HighchartsConnector";
import Highcharts from "highcharts/highcharts";
import {
  Themes,
  LineOptionsOneSerieTwoCategories,
  ColumnOptionsOneSerie,
  PieOptionsOneSerie
} from "./fixtures";


chai.use(chaiEnzyme());
const expect = chai.expect;

describe("HighchartsConnector", function() {

  describe("basic line", function() {
    beforeEach(function() {
      let that = this;
      this.highchartsStub = sinon.stub(Highcharts, "chart", function() {
        that.stubArgs = arguments;
        return <svg />;
      });
      this.credits = "credits";
      this.title = "title";
      this.subtitle = "subtitle";
      this.yAxisTitle = "yAxisTitle";
      this.categories = ["Jan", "Fev", "Mar"];
      this.labels = true;
      this.series = [{
        name: "serie",
        value: ["0", "1", "2"]
      }];
      this.options = Object.assign({}, LineOptionsOneSerieTwoCategories, {
        credits: this.credits,
        title: this.title,
        subtitle: this.subtitle,
        yAxisTitle: this.yAxisTitle,
        categories: this.categories,
        labels: this.labels,
        data: this.series
      });
    });

    afterEach(function() {
      this.highchartsStub.restore();
    });

    it("credits should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].credits.text).to.equal("Fonte: " + this.credits);
    });

    it("title should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].title.text).to.equal(this.title);
    });

    it("subtitle should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].subtitle.text).to.equal(this.subtitle);
    });

    it("yAxisTitle should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].yAxis.title.text).to.equal(this.yAxisTitle);
    });

    it("categories should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].xAxis.categories).to.eql(this.categories);
    });

    it("labels should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].plotOptions.line.dataLabels.enabled).to.equal(this.labels);
    });

    it("series should be in basicLine Highcharts model", function() {
      HighchartsConnector.CreateBasicLine("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].series[0].name).to.equal(this.series[0].name);
      expect(this.stubArgs[1].series[0].data).to.eql(this.series[0].value.map(parseFloat));
      expect(this.stubArgs[1].series[0].color).to.equal(Themes.default.colors[0]);
    });
  });

  describe("simple column", function() {
    beforeEach(function() {
      let that = this;
      this.highchartsStub = sinon.stub(Highcharts, "chart", function() {
        that.stubArgs = arguments;
        return <svg />;
      });
      this.credits = "credits";
      this.inverted = true;
      this.title = "title";
      this.subtitle = "subtitle";
      this.yAxisTitle = "yAxisTitle";
      this.name = "name";
      this.data = [
        {name: "serie", value: ["1"]}
      ];
      this.x = 10;
      this.y = 5;
      this.options = Object.assign({}, ColumnOptionsOneSerie, {
        credits: this.credits,
        inverted: this.inverted,
        title: this.title,
        subtitle: this.subtitle,
        yAxisTitle: this.yAxisTitle,
        name: this.name,
        data: this.data,
        x: this.x,
        y: this.y
      });
    });

    afterEach(function() {
      this.highchartsStub.restore();
    });

    it("credits should be in simpleColumn Highcharts model", function() {
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].credits.text).to.equal("Fonte: " + this.credits);
    });

    it("inverted should be in simpleColumn Highcharts model", function() {
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].chart.inverted).to.equal(this.inverted);
    });

    it("title should be in simpleColumn Highcharts model", function() {
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].title.text).to.equal(this.title);
    });

    it("subtitle should be in simpleColumn Highcharts model", function() {
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].subtitle.text).to.equal(this.subtitle);
    });

    it("yAxisTitle should be in simpleColumn Highcharts model", function() {
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].yAxis.title.text).to.equal(this.yAxisTitle);
    });

    it("series should be in simpleColumn Highcharts model", function() {
      let expectedData = [
        this.data[0].name,
        parseFloat(this.data[0].value[0])
      ];
      HighchartsConnector.CreateSimpleColumn("container", Themes.default.colors, this.options);

      expect(this.stubArgs[1].series[0].name).to.equal(this.name);
      expect(this.stubArgs[1].series[0].data[0]).to.eql(expectedData);
    });
  });

  describe("pie chart", function() {
    beforeEach(function() {
      let that = this;
      this.highchartsStub = sinon.stub(Highcharts, "chart", function() {
        that.stubArgs = arguments;
        return <svg />;
      });
      this.credits = "credits";
      this.title = "title";
      this.subtitle = "subtitle";
      this.name = "name";
      this.percentage = true;
      this.data = [{
        name: "serie",
        value: ["1"]
      }];
      this.options = Object.assign({}, PieOptionsOneSerie, {
        credits: this.credits,
        title: this.title,
        subtitle: this.subtitle,
        name: this.name,
        percentage: this.percentage,
        data: this.data
      });
    });

    afterEach(function() {
      this.highchartsStub.restore();
    });

    it("credits should be in pieChart Highcharts model", function() {
      HighchartsConnector.CreatePieChart("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].credits.text).to.equal("Fonte: " + this.credits);
    });

    it("title should be in pieChart Highcharts model", function() {
      HighchartsConnector.CreatePieChart("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].title.text).to.equal(this.title);
    });

    it("subtitle should be in pieChart Highcharts model", function() {
      HighchartsConnector.CreatePieChart("container", Themes.default.colors, this.options);
      expect(this.stubArgs[1].subtitle.text).to.equal(this.subtitle);
    });

    it("series should be in simpleColumn Highcharts model", function() {
      let expectedData = {
        name: this.data[0].name,
        y: parseFloat(this.data[0].value[0])
      };
      HighchartsConnector.CreatePieChart("container", Themes.default.colors, this.options);

      expect(this.stubArgs[1].series[0].name).to.equal(this.name);
      expect(this.stubArgs[1].series[0].data[0]).to.eql(expectedData);
    });
  });
});
