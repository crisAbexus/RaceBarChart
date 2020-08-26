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

  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])
  const y = d3.scaleBand().domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1)

  const height = margin.top + barSize * n + margin.bottom


  console.log('App.js - drawRace - data:');
  console.log(data);

  console.log('App.js - d3array.group(data, d => d.name):');
  console.log(d3array.group(data, d => d.name));

  console.log('App.js - data.filter(d => d.name === \'Heineken\'):');
  console.log(data.filter(d => d.name === 'Heineken'));

  console.log('App.js - n:');
  console.log(n);

  const names = new Set(data.map(d => d.name));

  console.log('App.js - names:');
  console.log(names);

  console.log('App.js - d3array.rollup(data, ([d])=> d):');
  console.log(d3array.rollup(data, ([d]) => d));

  console.log('App.js - d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name):');
  console.log(d3array.rollup(data, ([d]) => d.value, d => d.date, d => d.name));

  const datevalues = Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => d3.ascending(a, b))

  console.log('App.js - Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name)):');
  console.log(Array.from(d3array.rollup(data, ([d]) => d.value, d => +d.date, d => d.name)));

  console.log('App.js - datevalues:');
  console.log(datevalues);

  const k = 10;

  console.log('App.js - k:');
  console.log(k);

  const nkeyframes = keyframes(datevalues, k, names, n);


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

