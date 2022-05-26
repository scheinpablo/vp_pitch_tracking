import React, { useEffect } from "react";
import { useSelector, useState } from "react-redux";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { store } from "../index";

const graphIndexWindow = 100;

var dps = []; //dataPoints.

const MovingGraph2 = () => {
  const fileWindowTime = useSelector((state) => state.file.fileWindowTime);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const filePitches = useSelector((state) => state.file.filePitches);
  const currentPitchIndex = useSelector(
    (state) => state.piano.currentPitchIndex
  );

  useEffect(() => {
    initDsp();
  }, []);

  const initDsp = () => {
    console.log("init dsp");
    let a = filePitches;
    dps = a.slice(0, graphIndexWindow / 4).map((val, i) => {
      return {
        x: i,
        y: val,
      };
    });
  };

  const updateChart = () => {
    if (isRunning) {
      if (currentPitchIndex + graphIndexWindow / 4 < filePitches.length) {
        dps.push({
          x: currentPitchIndex + graphIndexWindow / 4,
          y: filePitches[currentPitchIndex + graphIndexWindow / 4],
        });

        //index++;
      }

      if (dps.length > graphIndexWindow - 1) dps.shift();
    }

    if (currentPitchIndex + 1 == filePitches.length) {
      initDsp();
    }
  };

  updateChart();
  const options = {
    axisY: {
      minimum: 80,
      maximum: 700,
      interval: 100,
    },
    title: {
      text: "Pitch Chart",
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
      <CanvasJSChart options={options} />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};
export default MovingGraph2;
