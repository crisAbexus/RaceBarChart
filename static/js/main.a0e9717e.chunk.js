(this.webpackJsonpbar_chart_race=this.webpackJsonpbar_chart_race||[]).push([[0],{91:function(t,n,e){t.exports=e(99)},96:function(t,n,e){},98:function(t,n,e){},99:function(t,n,e){"use strict";e.r(n);var r=e(2),a=e.n(r),o=e(57),c=e.n(o),u=(e(96),e(3)),i=e(5),f=e.n(i),l=e(1),s=e(24),p=(e(98),e(0)),v=e(101),m=e(58);function d(t,n,e){var r=Array.from(n,(function(n){return{name:n,value:t(n)}}));r.sort((function(t,n){return p.e(t.value,n.value)}));for(var a=0;a<r.length;++a)r[a].rank=Math.min(e,a);return r}function h(t,n,e,r){var a,o,c,i,f,s=[],v=Object(u.a)(p.i(t));try{for(v.s();!(f=v.n()).done;){var m=Object(l.a)(f.value,2),h=Object(l.a)(m[0],2);a=h[0],o=h[1];var g=Object(l.a)(m[1],2);c=g[0],i=g[1];for(var b=function(t){var u=t/n;s.push([new Date(a*(1-u)+c*u),d((function(t){return(o.get(t)||0)*(1-u)+(i.get(t)||0)*u}),e,r)])},y=0;y<n;++y)b(y)}}catch(w){v.e(w)}finally{v.f()}return s.push([new Date(c),d((function(t){return i.get(t)||0}),e,r)]),s}function g(){return(g=Object(s.a)(f.a.mark((function t(n,e){var r,a,o,c,i,s,m,d,g,b,y,w,x,j,k,O,A,M,E,S,D,_,B,z,I,J,W,C,F,N;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:E=function(t,n){var e=p.h(t,n);return function(t){this.textContent=O(e(t))}},M=function(t){var n=t.append("g").style("font","bold 12px var(--sans-serif)").style("font-variant-numeric","tabular-nums").attr("text-anchor","end").selectAll("text");return function(t,e){var r=Object(l.a)(t,2),a=(r[0],r[1]);return n=n.data(a.slice(0,i),(function(t){return t.name})).join((function(t){return t.append("text").attr("transform",(function(t){return"translate(".concat(S((j.get(t)||t).value),",").concat(D((j.get(t)||t).rank),")")})).attr("y",D.bandwidth()/2).attr("x",-6).attr("dy","-0.25em").text((function(t){return t.name})).call((function(t){return t.append("tspan").attr("fill-opacity",.7).attr("font-weight","normal").attr("x",-6).attr("dy","1.15em")}))}),(function(t){return t}),(function(t){return t.transition(e).remove().attr("transform",(function(t){return"translate(".concat(S((k.get(t)||t).value),",").concat(D((k.get(t)||t).rank),")")})).call((function(t){return t.select("tspan").tween("text",(function(t){return E(t.value,(k.get(t)||t).value)}))}))})).call((function(t){return t.transition(e).attr("transform",(function(t){return"translate(".concat(S(t.value),",").concat(D(t.rank),")")})).call((function(t){return t.select("tspan").tween("text",(function(t){return E((j.get(t)||t).value,t.value)}))}))}))}},A=function(t){var n=t.append("g").attr("fill-opacity",.6).selectAll("rect");return function(t,e){var r=Object(l.a)(t,2),a=(r[0],r[1]);return n=n.data(a.slice(0,i),(function(t){return t.name})).join((function(t){return t.append("rect").attr("fill",w()).attr("height",D.bandwidth()).attr("x",S(0)).attr("y",(function(t){return D((j.get(t)||t).rank)})).attr("width",(function(t){return S((j.get(t)||t).value)-S(0)}))}),(function(t){return t}),(function(t){return t.transition(e).remove().attr("y",(function(t){return D((k.get(t)||t).rank)})).attr("width",(function(t){return S((k.get(t)||t).value)-S(0)}))})).call((function(t){return t.transition(e).attr("y",(function(t){return D(t.rank)})).attr("width",(function(t){return S(t.value)-S(0)}))}))}},y=function(t){var n=t.append("g").attr("transform","translate(0,".concat(c.top,")")),e=p.c(S).ticks(r/160).tickSizeOuter(0).tickSizeInner(-a*(i+D.padding()));return function(t,r){n.transition(r).call(e),n.select(".tick:first-of-type text").remove(),n.selectAll(".tick:not(:first-of-type) line").attr("stroke","white"),n.select(".domain").remove()}},g=function(t){var n=t.append("text").style("font","bold ".concat(a,"px var(--sans-serif)")).style("font-variant-numeric","tabular-nums").attr("text-anchor","end").attr("x",r-6).attr("y",c.top+a*(i-.45)).attr("dy","0.32em").text(b(d[0][0]));return function(t,e){var r=Object(l.a)(t,1)[0];e.end().then((function(){return n.text(b(r))}))}},r=954,a=48,o=250,c={top:16,right:6,bottom:6,left:0},i=12,s=Array.from(v.b(e,(function(t){return Object(l.a)(t,1)[0].value}),(function(t){return+t.date}),(function(t){return t.name}))).map((function(t){var n=Object(l.a)(t,2),e=n[0],r=n[1];return[new Date(e),r]})).sort((function(t,n){var e=Object(l.a)(t,1)[0],r=Object(l.a)(n,1)[0];return p.a(e,r)})),10,m=new Set(e.map((function(t){return t.name}))),d=h(s,10,m,i),b=p.p("%Y"),w=function(){var t=p.m(p.n);if(e.some((function(t){return void 0!==t.category}))){var n=new Map(e.map((function(t){return[t.name,t.category]})));return t.domain(Array.from(n.values())),function(e){return t(n.get(e.name))}}return function(n){return t(n.name)}},x=v.a(d.flatMap((function(t){return Object(l.a)(t,2)[1]})),(function(t){return t.name})),j=new Map(x.flatMap((function(t){var n=Object(l.a)(t,2)[1];return p.i(n,(function(t,n){return[n,t]}))}))),k=new Map(x.flatMap((function(t){var n=Object(l.a)(t,2)[1];return p.i(n)}))),O=p.g(",d"),S=p.l([0,1],[c.left,r-c.right]),D=p.k().domain(p.j(i+1)).rangeRound([c.top,c.top+a*(i+1+.1)]).padding(.1),_=c.top+a*i+c.bottom,n.attr("viewBox",[0,150,r,_]),B=A(n),z=y(n),I=M(n),J=g(n),console.log("App.js - nkeyframes:"),console.log(d),console.log("App.js - nkeyframes.length:"),console.log(d.length),W=Object(u.a)(d),t.prev=33,W.s();case 35:if((C=W.n()).done){t.next=52;break}if((F=C.value)===d[90]){t.next=48;break}return N=n.transition().duration(o).ease(p.f),S.domain([0,F[1][0].value]),z(F,N),B(F,N),I(F,N),J(F,N),t.next=46,N.end();case 46:t.next=50;break;case 48:console.log("App.js - keyframe:"),console.log(F);case 50:t.next=35;break;case 52:t.next=57;break;case 54:t.prev=54,t.t0=t.catch(33),W.e(t.t0);case 57:return t.prev=57,W.f(),t.finish(57);case 60:case"end":return t.stop()}}),t,null,[[33,54,57,60]])})))).apply(this,arguments)}function b(){var t=Object(r.useState)(null),n=Object(l.a)(t,2),e=n[0],o=n[1];Object(r.useEffect)((function(){function t(){return(t=Object(s.a)(f.a.mark((function t(){var n,e;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.d("dataFrame.csv");case 2:n=t.sent,console.log("App.js - csv:"),console.log(n),e=n,n.forEach((function(t,n){var r=new Date(t.date),a=p.b(r);e[n].date=a})),o(e);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]);var c=Object(m.a)((function(t){null!==e&&function(t,n){g.apply(this,arguments)}(p.o(t),e)}));return a.a.createElement("div",{className:"App"},a.a.createElement("svg",{width:"1024",height:"1024",ref:c}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[91,1,2]]]);
//# sourceMappingURL=main.a0e9717e.chunk.js.map