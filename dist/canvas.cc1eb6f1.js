parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"GFyL":[function(require,module,exports) {
var e=document.querySelector("#cvs"),n=function(){e.width=window.innerWidth,e.height=window.innerHeight};n();var i=e.getContext("2d"),t={x:e.width/2,y:e.height/2},o="#333",c=function(){return function(e,n,t,c){i.beginPath(),i.moveTo(e,n),i.lineTo(t,c),i.strokeStyle=o,i.stroke()}},r={distance:5,coefficient:1},a={width:r.distance,height:5},h={height:r.distance,width:5},d=function(e){i.beginPath(),i.moveTo(e,t.y),i.lineTo(e,t.y-a.height),i.strokeStyle=o,i.stroke()},u=function(e){i.beginPath(),i.moveTo(t.x,e),i.lineTo(t.x+h.width,e),i.strokeStyle=o,i.stroke()},f=function(){var n=Math.floor((e.width-t.x)/a.width);new Array(n).fill(null).forEach(function(e,n){0!==n&&d(t.x+n*a.width)});var i=Math.floor(t.x/a.width);new Array(i).fill(null).forEach(function(e,n){0!==n&&d(t.x-n*a.width)})},l=function(){var n=Math.floor((e.height-t.y)/h.height);new Array(n).fill(null).forEach(function(e,n){0!==n&&u(t.y+n*h.height)});var i=Math.floor(t.y/h.height);new Array(i).fill(null).forEach(function(e,n){0!==n&&u(t.y-n*h.height)})},s=function(){c()(0,t.y,e.width,t.y),c()(t.x,0,t.x,e.height),f(),l()},w=30,v={isMouseDown:!1,canMove:!1,handleMouseDown:function(){e.addEventListener("mousedown",function(e){v.isMouseDown=!0;var n=Math.abs(t.x-e.clientX),i=Math.abs(t.y-e.clientY);v.canMove=n-w<0||i-w<0})},handleMouseMove:function(){e.addEventListener("mousemove",function(e){v.isMouseDown&&v.canMove&&(t.x=e.clientX,t.y=e.clientY,M.renderShape())})},handleMouseUp:function(){e.addEventListener("mouseup",function(e){v.isMouseDown=!1})},init:function(){v.handleMouseDown(),v.handleMouseMove(),v.handleMouseUp()}},y={handleMouseWheel:function(){e.addEventListener("mousewheel",function(e){console.log(e.deltaY);var n=e.deltaY;r.coefficient+=n,r.coefficient<=.5&&(r.coefficient=.5),r.coefficient>=20&&(r.coefficient=20),console.log(r.coefficient),a.width=r.coefficient*r.distance,h.height=r.coefficient*r.distance,M.renderShape()})},init:function(){y.handleMouseWheel()}},g={coordinate:{x:0,y:0},handleMouseMove:function(){var n=document.querySelector("#coordinate");e.addEventListener("mousemove",function(e){var i=(e.clientX-t.x)/a.width,o=(t.y-e.clientY)/h.height;g.coordinate.x=i,g.coordinate.y=o,n.textContent="x:"+i+",y:"+o})},init:function(){g.handleMouseMove()}},M={isDrawing:!1,coordinates:[],handleButtonClick:function(){var e=document.querySelector("#draw");e.addEventListener("click",function(n){if(!M.isDrawing)return v.canMove=!1,M.isDrawing=!0,void(e.textContent="停止绘制");v.canMove=!0,M.isDrawing=!1,e.textContent="开始绘制"})},drawShape:function(){e.addEventListener("click",function(e){M.isDrawing&&(M.coordinates.push({x:g.coordinate.x,y:g.coordinate.y,originX:e.clientX,originY:e.clientY}),console.log(M.coordinates),M.renderShape())})},renderShape:function(){i.clearRect(0,0,innerWidth,innerHeight),s(),M.coordinates.forEach(function(e,n){0===n&&i.moveTo(x(e.x),m(e.y)),i.lineTo(x(e.x),m(e.y))}),i.strokeStyle=o,i.stroke()},init:function(){M.handleButtonClick(),M.drawShape()}},x=function(e){return e*r.distance*r.coefficient+t.x},m=function(e){return t.y-e*r.distance*r.coefficient};v.init(),y.init(),g.init(),M.init(),s();
},{}]},{},["GFyL"], null)
//# sourceMappingURL=canvas.cc1eb6f1.js.map