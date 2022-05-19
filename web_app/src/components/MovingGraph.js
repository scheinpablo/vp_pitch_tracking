import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "./canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { store } from "../index";
var dps = []; //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;
export default class MovingGraph extends React.Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);

    this.state = {
      filePitches: [],
    };
  }

  componentDidMount() {
    setInterval(this.updateChart, updateInterval);
    store.subscribe(() => {
      this.setState({
        filePitches: store.getState().file.filePitches,
      });
    });
  }
  updateChart() {
    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
    //this.state.filePitches.push({ x: xVal, y: yVal });
    xVal++;
    if (this.state.filePitches.length > 10) {
      this.state.filePitches.shift();
    }
    this.chart.render();
  }
  render() {
    const options = {
      title: {
        text: "Dynamic Line Chart",
      },
      data: [
        {
          type: "line",
          dataPoints: this.state.filePitches,
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
