# Chart - Megadraft Plugin
[![Build Status](https://travis-ci.org/globocom/megadraft-chart-plugin.svg?branch=master)](https://travis-ci.org/globocom/megadraft-chart-plugin)

## Component

It's a [Megadraft](http://megadraft.io) Plugin that render charts using data given by user.

[Highcharts](https://www.highcharts.com/products/highcharts) is a Free for Non-commercial usage Javascript Library. Since this plugin use it to render charts, you must have a Highcharts License to use as commercial purpose.

> Highcharts is a charting library written in pure JavaScript, offering an easy way of adding interactive charts to your web site or web application. Highcharts currently supports line, spline, area, areaspline, column, bar, pie, scatter, angular gauges, arearange, areasplinerange, columnrange, bubble, box plot, error bars, funnel, waterfall and polar chart types.
[See more](https://www.highcharts.com/products/highcharts)

## Architecture

![Architecture Diagram](docs/arquitetura.png)

On select `Chart` plugin at Megadraft plugin modal, a `ModalChart` component will be instantiated.

`ModalChart` is a modal component splitted in two parts: form and preview.
There are three chart type options: line, column and pie. Each one has their own Form component:

1. `FormLine` for line chart;
2. `FormColumn` for column chart;
3. `FormPie` for pie chart;

`Chart` is the component in charge of render a chart preview. Chart Preview is re-render whenever a change on the Form is made.

`HighchartsConnector` is responsible for translating the form data into valid data to Highcharts lib.

To complete chart edition, `APLICAR` button should be clicked.
It's possible to edit a Chart by clicking in Megadraft edit block button.
A SVG copy of the chart is added to block data.


## Line Chart preview Example

![Line Chart preview Example](docs/exemplo-chart.png)


## Install dependencies (npm)

```
make setup
```

## Running dev-server

```
make run
open http://localhost:8080/demo
```

## Testing

To run test and lint

```
make test
```

You can also run tests as watch mode:

```
make watch_unit
```
