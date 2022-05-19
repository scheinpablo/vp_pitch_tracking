import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const GraphComponent = () => {
  const filePitches = useSelector((state) => state.file.filePitches);

  const renderCustomAxisTick = ({ x, y, payload }) => {
    let path = "";

    return <p></p>;
  };
  return (
    <div>
      <LineChart
        width={1300}
        height={300}
        data={filePitches.map((item, i) => {
          return {
            uv: item,
            i: i,
          };
        })}
      >
        <XAxis dataKey="i" tick={renderCustomAxisTick} />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="2 2" />
        <Line type="linear" dataKey="uv" stroke="#bbbbbb" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default GraphComponent;
