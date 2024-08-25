"use client";
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function TrendChart({ title, data }: any) {
  const allValues = data
    .map((item: any) => item.previous)
    .concat(
      ...data.map((item: any) => (item.current ? item.current : []))
    )
    .sort();

  return (
    <div>
      <h2>{title}</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="previous" stroke="#8884d8" />
        <Line type="monotone" dataKey="current" stroke="#d4d884" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis
          domain={[allValues[0] - 50, allValues[allValues.length - 1] + 50]}
        />
      </LineChart>
    </div>
  );
}
