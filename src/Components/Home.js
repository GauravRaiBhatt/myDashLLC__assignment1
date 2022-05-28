import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 500;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const xScale = d3
      .scaleBand()
      .domain(data.map((v, i) => i))
      .range([0, width])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0,${height})`);

    svg.append("g").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (v, i) => xScale(i))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (v) => height - yScale(v));
  }, [data]);

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      navigate(-1);
    } else {
      let d = [];
      for (let i = 0; i < 7; i++) {
        d.push(Math.floor(Math.random() * 500));
      }
      setData(d);
    }
  }, []);
  return (
    <div id="Home__Container">
      <svg ref={svgRef} id="chart"></svg>
    </div>
  );
}

export default Home;
