import * as d3 from 'd3';

export default function rank(value, names, n) {
  console.log('rank.js - value:');
  console.log(value);
  console.log('rank.js - names:');
  console.log(names);
  console.log('rank.js - n:');
  console.log(n);
  const data = Array.from(names, name => ({name, value: value(name)}));
  data.sort((a, b) => d3.descending(a.value, b.value));
  for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
  return data;
}