import * as d3 from 'd3';
import rank from "./rank";

export default function keyframes (datevalues, k, names, n) {
  const keyframes = [];
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t, names, n)
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0,names, n)]);
  return keyframes;
};