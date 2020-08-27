import React, { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';
import * as d3array from 'd3-array';
import { useD3 } from 'd3blackbox';
import keyframes from "./functions/keyframes";


async function drawRace(svg, data) {
  const width = 954;
  const barSize = 48;
  const duration = 250;
  const margin = ({ top: 16, right: 6, bottom: 6, left: 0 });
  const n = 12;

  const datevalues = Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => d3.ascending(a, b))

  const k = 10;

  const names = new Set(data.map(d => d.name));

  const nkeyframes = keyframes(datevalues, k, names, n);

  function ticker(svg) {
    console.log('App.js - svg:');
    console.log(svg);
    const now = svg.append("text")
      .style("font", `bold ${barSize}px var(--sans-serif)`)
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", margin.top + barSize * (n - 0.45))
      .attr("dy", "0.32em")
      .text(formatDate(nkeyframes[0][0]));

    return ([date], transition) => {
      transition.end().then(() => now.text(formatDate(date)));
    };
  }

  const formatDate = d3.utcFormat("%Y");

  function axis(svg) {
    const g = svg.append("g")
      .attr("transform", `translate(0,${margin.top})`);

    const axis = d3.axisTop(x)
      .ticks(width / 160)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + y.padding()));

    return (_, transition) => {
      g.transition(transition).call(axis);
      g.select(".tick:first-of-type text").remove();
      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
      g.select(".domain").remove();
    };
  }

  function bars(svg) {
    let bar = svg.append("g")
      .attr("fill-opacity", 0.6)
      .selectAll("rect");

    return ([date, data], transition) => bar = bar
      .data(data.slice(0, n), d => d.name)
      .join(
        enter => enter.append("rect")
          .attr("fill", color)
          .attr("height", y.bandwidth())
          .attr("x", x(0))
          .attr("y", d => y((prev.get(d) || d).rank))
          .attr("width", d => x((prev.get(d) || d).value) - x(0)),
        update => update,
        exit => exit.transition(transition).remove()
          .attr("y", d => y((next.get(d) || d).rank))
          .attr("width", d => x((next.get(d) || d).value) - x(0))
      )
      .call(bar => bar.transition(transition)
        .attr("y", d => y(d.rank))
        .attr("width", d => x(d.value) - x(0)));
  }

  function labels(svg) {
    let label = svg.append("g")
      .style("font", "bold 12px var(--sans-serif)")
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .selectAll("text");

    return ([date, data], transition) => label = label
      .data(data.slice(0, n), d => d.name)
      .join(
        enter => enter.append("text")
          .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
          .attr("y", y.bandwidth() / 2)
          .attr("x", -6)
          .attr("dy", "-0.25em")
          .text(d => d.name)
          .call(text => text.append("tspan")
            .attr("fill-opacity", 0.7)
            .attr("font-weight", "normal")
            .attr("x", -6)
            .attr("dy", "1.15em")),
        update => update,
        exit => exit.transition(transition).remove()
          .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
          .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
      )
      .call(bar => bar.transition(transition)
        .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
        .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))))
  }

  function textTween(a, b) {
    const i = d3.interpolateNumber(a, b);
    return function (t) {
      this.textContent = formatNumber(i(t));
    };
  }

  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])
  const y = d3.scaleBand().domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1)

  const height = margin.top + barSize * n + margin.bottom


  svg.attr("viewBox", [0, 0, width, height]);

  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  for (const keyframe of keyframes) {
    const transition = svg.transition()
      .duration(duration)
      .ease(d3.easeLinear);

    // Extract the top bar’s value.
    x.domain([0, keyframe[1][0].value]);

    updateAxis(keyframe, transition);
    updateBars(keyframe, transition);
    updateLabels(keyframe, transition);
    updateTicker(keyframe, transition);

    await transition.end();
  }


  console.log('App.js - drawRace - data:');
  console.log(data);

  console.log('App.js - d3array.group(data, d => d.name):');
  console.log(d3array.group(data, d => d.name));

  console.log('App.js - data.filter(d => d.name === \'Heineken\'):');
  console.log(data.filter(d => d.name === 'Heineken'));

  console.log('App.js - n:');
  console.log(n);

  console.log('App.js - names:');
  console.log(names);

  console.log('App.js - d3array.rollup(data, ([d])=> d):');
  console.log(d3array.rollup(data, ([d]) => d));

  console.log('App.js - d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name):');
  console.log(d3array.rollup(data, ([d]) => d.value, d => d.date, d => d.name));



  console.log('App.js - Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name)):');
  console.log(Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name)));

  console.log('App.js - datevalues:');
  console.log(datevalues);

  console.log('App.js - k:');
  console.log(k);

  console.log('App.js - nkeyframes:');
  console.log(nkeyframes);

  const nameframes = d3array.groups(nkeyframes.flatMap(([, data]) => data), d => d.name);

  console.log('App.js - nameframes:');
  console.log(nameframes);

  const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));

  console.log('App.js - prev:');
  console.log(prev);

  const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));
  console.log('App.js - next:');
  console.log(next);

  const formatNumber = d3.format(",d")
  console.log('App.js - formatNumber:');
  console.log(formatNumber);

  const color = () => {
    const scale = d3.scaleOrdinal(d3.schemeTableau10);
    if (data.some(d => d.category !== undefined)) {
      const categoryByName = new Map(data.map(d => [d.name, d.category]))
      scale.domain(Array.from(categoryByName.values()));
      return d => scale(categoryByName.get(d.name));
    }
    return d => scale(d.name);
  }

}

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const csv = await d3.csv('category-brands.csv')
      let data = csv
      console.log('App.js - csv:');
      console.log(csv);
      csv.forEach((d, idx) => {
        let date = new Date(d.date);
        console.log(`App.js - date.toLocaleString('en-CA').split(',')[0]:`);
        console.log(date.toLocaleString('en-CA').split(',')[0]);
        const autoType = d3.autoType(date);
        console.log('App.js - autoType:');
        console.log(autoType);
        data[idx].date = autoType

      })
      console.log('App.js - data:');
      console.log(data);
      setData(data)
    }
    loadData();

  }, []);

  const svgRef = useD3(anchor => {
    console.log('App.js - anchor:');
    console.log(anchor);
    if (data !== null) {
      console.log('data:');
      console.log(data)

      drawRace(d3.select(anchor), data)
    }
  });

  return (
    <div className="App">
      <svg width='1024' height='1024' ref={svgRef} />
    </div>
  );
}

