import React, { useEffect } from "react";
import { useSelector, useState } from "react-redux";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { store } from "../index";

const initialIndex = 50;
var index = initialIndex;
var dps = []; //dataPoints.
var updateInterval = 50;
export default class MovingGraph extends React.Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
    this.initDsp();
  }

  initDsp() {
    index = initialIndex;
    console.log("init dsp");
    let a = store.getState().file.filePitches;
    dps = a.slice(0, initialIndex).map((val, i) => {
      return {
        x: i,
        y: val,
      };
    });
  }

  componentDidMount() {
    setInterval(this.updateChart, updateInterval);
  }
  updateChart() {
    if (
      store.getState().timer.isRunning &&
      index < store.getState().file.filePitches.length
    ) {
      dps.push({ x: index, y: store.getState().file.filePitches[index] });
      index++;
      if (dps.length > 50) {
        //dps.shift();
        dps.shift();
      }
      this.chart.render();
    }
    /* if (index == store.getState().file.filePitches.length) {
      this.initDsp();
      this.chart.render();
    } */
  }
  render() {
    const options = {
      axisY: {
        minimum: 80,
        maximum: 700,
        interval: 100,
      },
      title: {
        text: "Dynamic Line Chart",
      },
      data: [
        {
          type: "splineArea",
          dataPoints: dps,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
